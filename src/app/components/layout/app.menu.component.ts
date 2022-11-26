import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/app.layout.service';
import { UserRole } from '../../models/user-role';
import { AuthGuard } from '../../helpers/auth.guard';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(
        public layoutService: LayoutService,
        private authGuard: AuthGuard
    ) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: [''],
                    },
                    {
                        label: 'Missions',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['/data/missions'],
                    },
                ],
                role: UserRole.MEMBER,
            },
            {
                label: 'Components',
                items: [
                    {
                        label: "DLC's",
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['/data/dlcs'],
                    },
                    {
                        label: 'Game types',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['/data/game-types'],
                    },
                    {
                        label: 'Maps',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['/data/maps'],
                    },
                    {
                        label: 'Mission files',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['/data/mission-files'],
                    },
                    {
                        label: 'Modsets',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['/data/modsets'],
                    },
                    {
                        label: 'Statuses',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['/data/statuses'],
                    },
                ],
                role: UserRole.CREATOR,
            },
            {
                label: 'Admin',
                items: [
                    {
                        label: 'Users',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['/users'],
                    },
                ],
                role: UserRole.ADMIN,
            },
        ];
    }

    hasPermission(requiredRole: UserRole | undefined): boolean {
        if (!requiredRole) return true;

        return this.authGuard.hasPermission(requiredRole);
    }
}
