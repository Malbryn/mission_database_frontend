import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Status } from '../../../models/status';
import { StatusService } from '../../../services/status.service';
import { Router } from '@angular/router';
import { AbstractDataComponent } from '../common/abstract-data.component';
import { AuthGuard } from '../../../helpers/auth.guard';
import { UserRole } from '../../../models/user-role';

@Component({
    templateUrl: './status.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class StatusComponent extends AbstractDataComponent implements OnInit {
    static readonly MANAGE_PERMISSION_LEVEL = UserRole.ADMIN;

    statuses: Status[] = [];

    constructor(
        private service: StatusService,
        private router: Router,
        authGuard: AuthGuard
    ) {
        super(authGuard);

        this.canManage = this.hasPermission(
            StatusComponent.MANAGE_PERMISSION_LEVEL
        );
    }

    override manage(): void {
        this.router.navigate(['data/statuses/manage']);
    }

    ngOnInit() {
        this.service.getAll().subscribe((data: Status[]) => {
            this.statuses = data;
            this.isLoading = false;
        });
    }
}
