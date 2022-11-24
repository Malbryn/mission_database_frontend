import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StatusComponent } from './status.component';
import { StatusManagerComponent } from './manager/status-manager.component';
import { AuthGuard } from '../../../helpers/auth.guard';
import { UserRole } from '../../../models/user-role';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: StatusComponent },
            {
                path: 'manage',
                component: StatusManagerComponent,
                canActivate: [AuthGuard],
                data: { role: UserRole.ADMIN },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class StatusRoutingModule {}
