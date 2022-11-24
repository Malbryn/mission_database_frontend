import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Modset } from '../../../models/modset';
import { ModsetService } from '../../../services/modset.service';
import { Router } from '@angular/router';
import { AbstractDataComponent } from '../common/abstract-data.component';
import { AuthGuard } from '../../../helpers/auth.guard';
import { UserRole } from '../../../models/user-role';

@Component({
    templateUrl: './modset.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class ModsetComponent extends AbstractDataComponent implements OnInit {
    static readonly MANAGE_PERMISSION_LEVEL = UserRole.ADMIN;

    modsets: Modset[] = [];

    constructor(
        private service: ModsetService,
        private router: Router,
        authGuard: AuthGuard
    ) {
        super(authGuard);

        this.canManage = this.hasPermission(
            ModsetComponent.MANAGE_PERMISSION_LEVEL
        );
    }

    override manage(): void {
        this.router.navigate(['data/modsets/manage']);
    }

    ngOnInit() {
        this.service.getAll().subscribe((data: Modset[]) => {
            this.modsets = data;
            this.isLoading = false;
        });
    }
}
