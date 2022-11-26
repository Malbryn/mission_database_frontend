import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Mission } from '../../../models/mission';
import { Router } from '@angular/router';
import { AbstractDataComponent } from '../common/abstract-data.component';
import { AuthGuard } from '../../../helpers/auth.guard';
import { UserRole } from '../../../models/user-role';
import { MissionService } from '../../../services/mission.service';
import { saveAs } from 'file-saver';

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
        authGuard: AuthGuard,
        messageService: MessageService
    ) {
        super(authGuard, messageService);

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

    async downloadMissionFile(id: number, fileName: string): Promise<void> {
        this.service.downloadMissionFile(id).subscribe({
            next: async (response) => {
                try {
                    await saveAs(response, `${fileName}.pbo`);
                } catch (error) {
                    this.handleError(error);
                }
            },
            error: (error) => this.handleError(error),
        });
    }
}
