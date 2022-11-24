import { Component, ElementRef, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { UserRole } from '../../../models/user-role';
import { AuthGuard } from '../../../helpers/auth.guard';

@Component({
    template: ``,
})
export abstract class AbstractDataComponent {
    @ViewChild('filter') filter!: ElementRef;

    isLoading: boolean = true;
    canManage: boolean = false;

    protected constructor(private authGuard: AuthGuard) {}

    abstract manage(): void;

    protected hasPermission(requiredRole: UserRole): boolean {
        return this.authGuard.hasPermission(requiredRole);
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
