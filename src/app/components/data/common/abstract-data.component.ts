import { Component, ElementRef, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
    template: ``,
})
export abstract class AbstractDataComponent {
    @ViewChild('filter') filter!: ElementRef;

    loading: boolean = true;

    abstract manage(): void;

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
