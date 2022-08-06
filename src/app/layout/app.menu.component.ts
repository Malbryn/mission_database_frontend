import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

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
                ],
            },
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
                        routerLink: ['data-files'],
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
