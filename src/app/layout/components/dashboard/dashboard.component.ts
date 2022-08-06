import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    templateUrl: './dashboard.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
    menuItems: MenuItem[] = [];

    ngOnInit() {
        this.menuItems = [
            {
                label: 'Components',
                items: [
                    {
                        label: "DLC's",
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['dlcs'],
                    },
                    {
                        label: 'Game types',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['game-types'],
                    },
                    {
                        label: 'Maps',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['maps'],
                    },
                    {
                        label: 'Missions',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['missions'],
                    },
                    {
                        label: 'Mission Files',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['mission-files'],
                    },
                    {
                        label: 'Modsets',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['modsets'],
                    },
                    {
                        label: 'Statuses',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['statuses'],
                    },
                ],
            },
        ];
    }
}
