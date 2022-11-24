import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModsetComponent } from './modset.component';
import { ModsetManagerComponent } from './manager/modset-manager.component';
import { AuthGuard } from '../../../helpers/auth.guard';
import { UserRole } from '../../../models/user-role';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: ModsetComponent },
            {
                path: 'manage',
                component: ModsetManagerComponent,
                canActivate: [AuthGuard],
                data: { role: UserRole.ADMIN },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class ModsetRoutingModule {}
