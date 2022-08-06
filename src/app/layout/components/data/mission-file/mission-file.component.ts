import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MissionService } from '../../../service/mission.service';
import { MissionFile } from '../../../api/MissionFile';

@Component({
    templateUrl: './mission-file.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class MissionFileComponent implements OnInit {
    missionFiles: MissionFile[] = [];
    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private missionService: MissionService) {}

    ngOnInit() {
        this.missionService.getMissionFiles().then((missionFiles) => {
            this.missionFiles = missionFiles;
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
