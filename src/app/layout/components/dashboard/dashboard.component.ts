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
                        label: 'Missions',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['missions'],
                    },
                ],
            },
        ];
    }
}
