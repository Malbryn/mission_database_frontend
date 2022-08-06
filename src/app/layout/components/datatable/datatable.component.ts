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
import { MissionFile } from '../../api/MissionFile';

interface expandedRows {
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

    missionFiles: MissionFile[] = [];

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    isExpanded: boolean = false;

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private missionService: MissionService) {}

    ngOnInit() {
        this.missionService.getMissions().then((missions) => {
            this.missions = missions;
            this.loading = false;
            console.log(this.missions);
        });

        // this.missionService.getMissionFiles().then((missionFiles) => {
        //     this.missionFiles = missionFiles;
        //     this.loading = false;
        //     console.log(this.missionFiles);
        // });
    }

    onSort() {
        this.updateRowGroupMetaData();
    }

    updateRowGroupMetaData() {}

    expandAll() {
        if (!this.isExpanded) {
            this.missions.forEach((mission) =>
                mission && mission.name
                    ? (this.expandedRows[mission.name] = true)
                    : ''
            );
        } else {
            this.expandedRows = {};
        }
        this.isExpanded = !this.isExpanded;
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
