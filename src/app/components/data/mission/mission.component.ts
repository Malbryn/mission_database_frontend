import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Mission } from '../../../models/Mission';
import { MissionService } from '../../../services/mission.service';

interface ExpandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './mission.component.html',
    styleUrls: ['./mission-component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class MissionComponent implements OnInit {
    missions: Mission[] = [];
    expandedRows: ExpandedRows = {};
    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private service: MissionService) {}

    ngOnInit() {
        this.service.getAll().subscribe((data: Mission[]) => {
            this.missions = data;
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
