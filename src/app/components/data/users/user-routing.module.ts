import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserManagerComponent } from './manager/user-manager.component';
import { AuthGuard } from '../../../helpers/auth.guard';
import { UserRole } from '../../../models/user-role';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: UserComponent },
            {
                path: 'manage',
                component: UserManagerComponent,
                canActivate: [AuthGuard],
                data: { role: UserRole.ADMIN },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class UserRoutingModule {}
