import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MapComponent } from './map.component';
import { MapManagerComponent } from './manager/map-manager.component';
import { AuthGuard } from '../../../helpers/auth.guard';
import { UserRole } from '../../../models/user-role';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: MapComponent },
            {
                path: 'manage',
                component: MapManagerComponent,
                canActivate: [AuthGuard],
                data: { role: UserRole.ADMIN },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class MapRoutingModule {}
