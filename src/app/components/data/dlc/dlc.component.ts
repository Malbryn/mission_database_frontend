import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DLC } from '../../../models/DLC';
import { Router } from '@angular/router';
import { DLCService } from '../../../services/dlc.service';

@Component({
    templateUrl: './dlc.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class DLCComponent implements OnInit {
    DLCs: DLC[] = [];
    loading: boolean = true;
    @ViewChild('filter') filter!: ElementRef;

    constructor(private service: DLCService, private router: Router) {}

    ngOnInit() {
        this.service.getAll().subscribe((data: DLC[]) => {
            this.DLCs = data;
            this.loading = false;
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    manage() {
        this.router.navigate(['data/dlcs/manage']);
    }
}
