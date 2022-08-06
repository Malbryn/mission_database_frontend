import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MissionService } from '../../service/mission.service';
import { Mission } from '../../api/Mission';

interface ExpandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './datatable.component.html',
    styleUrls: ['./datatable-component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class DatatableComponent implements OnInit {
    missions: Mission[] = [];
    expandedRows: ExpandedRows = {};
    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private missionService: MissionService) {}

    ngOnInit() {
        this.missionService.getMissions().then((missions) => {
            this.missions = missions;
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
