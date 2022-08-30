import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
    template: '',
})
export abstract class AbstractManagerComponent {
    @ViewChild('filter') filter!: ElementRef;
    newDialog: boolean = false;
    deleteDialog: boolean = false;
    isLoading: boolean = true;
    submitted: boolean = false;
    cols: any[] = [];

    protected constructor(
        protected router: Router,
        protected formBuilder: FormBuilder,
        protected authService: AuthService,
        protected messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.cols = [{ field: 'name', header: 'Name' }];
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    clearFilter(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    closeDialog() {
        this.newDialog = false;
        this.submitted = false;
    }

    goBack(component: string): void {
        this.router.navigateByUrl(`/data/${component}`).then();
    }

    abstract create(): void;

    abstract edit(data: any): void;

    abstract delete(data: any): void;

    abstract save(): void;

    abstract confirmDelete(): void;
}
