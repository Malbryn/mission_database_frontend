import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Map } from '../../../models/map';
import { Router } from '@angular/router';
import { AbstractDataComponent } from '../common/abstract-data.component';
import { AuthGuard } from '../../../helpers/auth.guard';
import { UserRole } from '../../../models/user-role';
import { MapService } from '../../../services/map.service';

@Component({
    templateUrl: './map.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class MapComponent extends AbstractDataComponent implements OnInit {
    static readonly MANAGE_PERMISSION_LEVEL = UserRole.ADMIN;

    maps: Map[] = [];

    constructor(
        private service: MapService,
        private router: Router,
        authGuard: AuthGuard
    ) {
        super(authGuard);

        this.canManage = this.hasPermission(
            MapComponent.MANAGE_PERMISSION_LEVEL
        );
    }

    override manage(): void {
        this.router.navigate(['data/maps/manage']);
    }

    ngOnInit() {
        this.service.getAll().subscribe((data: Map[]) => {
            this.maps = data;
            this.isLoading = false;
        });
    }
}
