import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AbstractDataComponent } from '../common/abstract-data.component';
import { AuthGuard } from '../../../helpers/auth.guard';
import { UserRole } from '../../../models/user-role';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
    templateUrl: './user.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class UserComponent extends AbstractDataComponent implements OnInit {
    static readonly MANAGE_PERMISSION_LEVEL = UserRole.ADMIN;

    users: User[] = [];

    constructor(
        private service: UserService,
        private router: Router,
        authGuard: AuthGuard,
        messageService: MessageService
    ) {
        super(authGuard, messageService);

        this.canManage = this.hasPermission(
            UserComponent.MANAGE_PERMISSION_LEVEL
        );
    }

    override manage(): void {
        this.router.navigate(['data/users/manage']);
    }

    ngOnInit() {
        this.service.getAll().subscribe((data: User[]) => {
            this.users = data;
            this.isLoading = false;
        });
    }
}
