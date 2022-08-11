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
import { Router } from '@angular/router';

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

    constructor(private service: MissionService, private router: Router) {}

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

    manage() {
        this.router.navigate(['data/missions/manage']);
    }

    downloadMissionFile(url: string): void {
        window.open(url, '_blank');
    }
}
