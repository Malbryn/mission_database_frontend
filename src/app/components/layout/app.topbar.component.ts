import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../services/app.layout.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    items!: MenuItem[];
    username = '';
    userRoleText = '';

    constructor(
        public authService: AuthService,
        public layoutService: LayoutService
    ) {
        this.authService.currentUser.subscribe({
            next: (user: User) => {
                if (user) {
                    this.username = user.username;
                    this.userRoleText = this.getUserRoleText(user);
                }
            },
        });
    }

    private getUserRoleText(user: User) {
        if (user['isAdmin']) return 'Admin';
        if (user['isStaff']) return 'Staff';
        if (user['isCreator']) return 'Creator';
        if (user['isMember']) return 'Member';

        return 'Unknown';
    }
}
