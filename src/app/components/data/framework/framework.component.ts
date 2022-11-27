import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AbstractDataComponent } from '../common/abstract-data.component';
import { AuthGuard } from '../../../helpers/auth.guard';
import { UserRole } from '../../../models/user-role';
import { Framework } from '../../../models/framework';
import { FrameworkService } from '../../../services/framework.service';

@Component({
    templateUrl: './framework.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class FrameworkComponent
    extends AbstractDataComponent
    implements OnInit
{
    static readonly MANAGE_PERMISSION_LEVEL = UserRole.ADMIN;

    frameworks: Framework[] = [];

    constructor(
        private service: FrameworkService,
        private router: Router,
        authGuard: AuthGuard,
        messageService: MessageService
    ) {
        super(authGuard, messageService);

        this.canManage = this.hasPermission(
            FrameworkComponent.MANAGE_PERMISSION_LEVEL
        );
    }

    override manage(): void {
        this.router.navigate(['data/frameworks/manage']);
    }

    ngOnInit() {
        this.service.getAll().subscribe((data: Framework[]) => {
            this.frameworks = data;
            this.isLoading = false;
        });
    }
}
