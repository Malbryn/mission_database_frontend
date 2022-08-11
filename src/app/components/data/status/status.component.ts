import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Status } from '../../../models/Status';
import { StatusService } from '../../../services/status.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './status.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class StatusComponent implements OnInit {
    statuses: Status[] = [];
    loading: boolean = true;
    @ViewChild('filter') filter!: ElementRef;

    constructor(private service: StatusService, private router: Router) {}

    ngOnInit() {
        this.service.getAll().subscribe((data: Status[]) => {
            this.statuses = data;
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
        this.router.navigate(['data/statuses/manage']);
    }
}
