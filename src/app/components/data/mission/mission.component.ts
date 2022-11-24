import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Mission } from '../../../models/mission';
import { Router } from '@angular/router';
import { AbstractDataComponent } from '../common/abstract-data.component';
import { AuthGuard } from '../../../helpers/auth.guard';
import { UserRole } from '../../../models/user-role';
import { MissionService } from '../../../services/mission.service';

@Component({
    templateUrl: './mission.component.html',
    styleUrls: ['./mission-component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class MissionComponent extends AbstractDataComponent implements OnInit {
    static readonly MANAGE_PERMISSION_LEVEL = UserRole.STAFF;

    missions: Mission[] = [];

    constructor(
        private service: MissionService,
        private router: Router,
        authGuard: AuthGuard
    ) {
        super(authGuard);

        this.canManage = this.hasPermission(
            MissionComponent.MANAGE_PERMISSION_LEVEL
        );
    }

    override manage(): void {
        this.router.navigate(['data/missions/manage']);
    }

    ngOnInit() {
        this.service.getAll().subscribe((data: Mission[]) => {
            this.missions = data;
            this.isLoading = false;
        });
    }

    downloadMissionFile(url: string): void {
        window.open(url, '_blank');
    }
}
