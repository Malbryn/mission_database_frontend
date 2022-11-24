import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DLCComponent } from './dlc.component';
import { DLCManagerComponent } from './manager/dlc-manager.component';
import { AuthGuard } from '../../../helpers/auth.guard';
import { UserRole } from '../../../models/user-role';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: DLCComponent },
            {
                path: 'manage',
                component: DLCManagerComponent,
                canActivate: [AuthGuard],
                data: { role: UserRole.ADMIN },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class DLCRoutingModule {}
