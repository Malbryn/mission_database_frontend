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

@Component({
    templateUrl: './status.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class StatusComponent implements OnInit {
    statuses: Status[] = [];
    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private service: StatusService) {}

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
}
