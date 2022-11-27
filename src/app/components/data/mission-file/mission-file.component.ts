import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MissionFile } from '../../../models/mission-file';
import { MissionFileService } from '../../../services/mission-file.service';
import { Router } from '@angular/router';
import { AbstractDataComponent } from '../common/abstract-data.component';
import { AuthGuard } from '../../../helpers/auth.guard';
import { UserRole } from '../../../models/user-role';
import { saveAs } from 'file-saver';

@Component({
    templateUrl: './mission-file.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class MissionFileComponent
    extends AbstractDataComponent
    implements OnInit
{
    static readonly MANAGE_PERMISSION_LEVEL = UserRole.ADMIN;

    missionFiles: MissionFile[] = [];

    constructor(
        private service: MissionFileService,
        private router: Router,
        authGuard: AuthGuard,
        messageService: MessageService
    ) {
        super(authGuard, messageService);

        this.canManage = this.hasPermission(
            MissionFileComponent.MANAGE_PERMISSION_LEVEL
        );
    }

    override manage(): void {
        this.router.navigate(['data/mission-files/manage']);
    }

    ngOnInit() {
        this.service.getAll().subscribe((data: MissionFile[]) => {
            this.missionFiles = data;
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
