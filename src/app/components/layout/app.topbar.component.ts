import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../services/app.layout.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    items!: MenuItem[];

    constructor(
        public authService: AuthService,
        public layoutService: LayoutService
    ) {}
}
