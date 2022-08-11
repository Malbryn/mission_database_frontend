import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../services/app.layout.service';

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
                        label: 'Missions',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['/data/missions'],
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
            },
        ];
    }
}
