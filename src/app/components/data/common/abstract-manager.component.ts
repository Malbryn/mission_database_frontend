import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { MessageType } from '../../../models/message-type';
import { CRUDService } from '../../../services/crud.service';
import { AbstractData } from '../../../models/abstract-data';

@Component({
    template: '',
})
export abstract class AbstractManagerComponent<T extends AbstractData>
    implements OnInit
{
    @ViewChild('filter') filter!: ElementRef;

    data: T[] = [];
    selectedValue!: T;
    form!: FormGroup;

    newDialog: boolean = false;
    deleteDialog: boolean = false;
    isLoading: boolean = true;
    cols: any[] = [];

    protected constructor(
        protected router: Router,
        protected formBuilder: FormBuilder,
        protected authService: AuthService,
        protected messageService: MessageService,
        protected service: CRUDService<T>
    ) {}

    ngOnInit() {
        this.service.getAll().subscribe({
            next: (value: T[]) => {
                this.data = value;
                this.setLoadingState(false);
            },
            error: (error) => this.handleError(error),
        });

        this.cols = [{ field: 'name', header: 'Name' }];
    }

    handleCreate(): void {
        this.form.reset();
        this.openNewDialog();
    }

    handleEdit(data: T): void {
        this.form.setValue({ ...data });
        this.openNewDialog();
    }

    handleDelete(data: T): void {
        this.selectedValue = { ...data };
        this.openDeleteDialog();
    }

    handleSave(): void {
        if (this.form.valid) {
            this.closeNewDialog();
            this.setLoadingState(true);

            const form = this.form;
            const formData = form.value;

            if (formData.id) {
                this.update(formData);
            } else {
                this.create(formData);
            }
        } else {
            this.showToastMessage(MessageType.WARNING, 'Invalid input data');
        }
    }

    confirmDelete(): void {
        this.closeDeleteDialog();
        this.setLoadingState(true);

        if (this.selectedValue.id) {
            this.service.delete(this.selectedValue.id).subscribe({
                next: () => {
                    this.data = this.data.filter(
                        (element: T) => element.id !== this.selectedValue.id
                    );

                    this.setLoadingState(false);
                    this.showToastMessage(
                        MessageType.SUCCESS,
                        'Deleted successfully'
                    );
                },
                error: (error) => this.handleError(error),
            });
        } else {
            this.setLoadingState(false);
            this.showToastMessage(MessageType.ERROR, 'Failed to delete entry');
        }
    }

    onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    clearFilter(table: Table): void {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    openNewDialog(): void {
        this.newDialog = true;
    }

    closeNewDialog(): void {
        this.newDialog = false;
    }

    openDeleteDialog(): void {
        this.deleteDialog = true;
    }

    closeDeleteDialog(): void {
        this.deleteDialog = false;
    }

    setLoadingState(state: boolean): void {
        this.isLoading = state;
    }

    goBack(component: string): void {
        this.router.navigateByUrl(`/data/${component}`).then();
    }

    protected findIndexById(id: number, array: any[]): number {
        let index = -1;

        for (let i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
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

    protected create(formData: T): void {
        this.service.create(formData).subscribe({
            next: (value: T) => {
                this.data.push(value);

                this.setLoadingState(false);
                this.showToastMessage(
                    MessageType.SUCCESS,
                    'Created successfully'
                );
            },
            error: (error) => this.handleError(error),
        });
    }

    protected update(formData: T): void {
        this.service.update(formData.id, formData).subscribe({
            next: (value: T) => {
                const index = this.findIndexById(formData.id, this.data);
                this.data[index] = value;

                this.setLoadingState(false);
                this.showToastMessage(
                    MessageType.SUCCESS,
                    'Updated successfully'
                );
            },
            error: (error) => this.handleError(error),
        });
    }
}
