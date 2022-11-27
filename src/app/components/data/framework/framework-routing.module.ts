import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FrameworkComponent } from './framework.component';
import { FrameworkManagerComponent } from './manager/framework-manager.component';
import { AuthGuard } from '../../../helpers/auth.guard';
import { UserRole } from '../../../models/user-role';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: FrameworkComponent },
            {
                path: 'manage',
                component: FrameworkManagerComponent,
                canActivate: [AuthGuard],
                data: { role: UserRole.ADMIN },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class FrameworkRoutingModule {}
