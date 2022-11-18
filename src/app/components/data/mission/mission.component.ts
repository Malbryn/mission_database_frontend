import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Mission } from '../../../models/mission';
import { MissionService } from '../../../services/mission.service';
import { Router } from '@angular/router';
import { AbstractDataComponent } from '../common/abstract-data.component';

@Component({
    templateUrl: './mission.component.html',
    styleUrls: ['./mission-component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class MissionComponent extends AbstractDataComponent implements OnInit {
    missions: Mission[] = [];

    constructor(private service: MissionService, private router: Router) {
        super();
    }

    override manage(): void {
        this.router.navigate(['data/missions/manage']);
    }

    ngOnInit() {
        this.service.getAll().subscribe((data: Mission[]) => {
            this.missions = data;
            this.loading = false;
        });
    }

    downloadMissionFile(url: string): void {
        window.open(url, '_blank');
    }
}
