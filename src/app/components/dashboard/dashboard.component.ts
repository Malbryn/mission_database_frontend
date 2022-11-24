import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './dashboard.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
    menuItems: MenuItem[] = [];

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
        if (!this.authService.currentUser.value.id) {
            this.router.navigate(['/auth/login']);
        }

        this.menuItems = [
            {
                label: 'Components',
                items: [
                    {
                        label: "DLC's",
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['data/dlcs'],
                    },
                    {
                        label: 'Game types',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['data/game-types'],
                    },
                    {
                        label: 'Maps',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['data/maps'],
                    },
                    {
                        label: 'Missions',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['data/missions'],
                    },
                    {
                        label: 'Mission files',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['data/mission-files'],
                    },
                    {
                        label: 'Modsets',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['data/modsets'],
                    },
                    {
                        label: 'Statuses',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['data/statuses'],
                    },
                ],
            },
        ];
    }
}
