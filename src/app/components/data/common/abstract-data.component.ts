import { Component, ElementRef, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { UserRole } from '../../../models/user-role';
import { AuthGuard } from '../../../helpers/auth.guard';
import { MessageType } from '../../../models/message-type';
import { MessageService } from 'primeng/api';

@Component({
    template: ``,
})
export abstract class AbstractDataComponent {
    @ViewChild('filter') filter!: ElementRef;

    isLoading: boolean = true;
    canManage: boolean = false;

    protected constructor(
        private authGuard: AuthGuard,
        private messageService: MessageService
    ) {}

    abstract manage(): void;

    protected hasPermission(requiredRole: UserRole): boolean {
        return this.authGuard.hasPermission(requiredRole);
    }

    protected handleError(
        error: any,
        message: string = 'Unknown error occurred'
    ): void {
        console.error('An error occurred: ', error);
        this.showToastMessage(MessageType.ERROR, message, 5000);
        this.setLoadingState(false);
    }

    protected showToastMessage(
        type: MessageType,
        message: string,
        duration: number = 3000
    ): void {
        this.messageService.add({
            severity: type.typeName,
            summary: type.displayName,
            detail: message,
            life: duration,
        });
    }

    setLoadingState(state: boolean): void {
        this.isLoading = state;
    }

    onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    clear(table: Table): void {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}
