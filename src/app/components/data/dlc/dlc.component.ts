import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DLC } from '../../../models/dlc';
import { Router } from '@angular/router';
import { DLCService } from '../../../services/dlc.service';
import { AbstractDataComponent } from '../common/abstract-data.component';
import { UserRole } from '../../../models/user-role';
import { AuthGuard } from '../../../helpers/auth.guard';

@Component({
    templateUrl: './dlc.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class DLCComponent extends AbstractDataComponent implements OnInit {
    static readonly MANAGE_PERMISSION_LEVEL = UserRole.ADMIN;

    DLCs: DLC[] = [];

    constructor(
        private service: DLCService,
        private router: Router,
        authGuard: AuthGuard
    ) {
        super(authGuard);

        this.canManage = this.hasPermission(
            DLCComponent.MANAGE_PERMISSION_LEVEL
        );
    }

    override manage(): void {
        this.router.navigate(['data/dlcs/manage']);
    }

    ngOnInit() {
        this.service.getAll().subscribe((data: DLC[]) => {
            this.DLCs = data;
            this.isLoading = false;
        });
    }
}
