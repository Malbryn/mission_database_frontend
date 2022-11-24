import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MissionComponent } from './mission.component';
import { MissionManagerComponent } from './manager/mission-manager.component';
import { AuthGuard } from '../../../helpers/auth.guard';
import { UserRole } from '../../../models/user-role';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: MissionComponent },
            {
                path: 'manage',
                component: MissionManagerComponent,
                canActivate: [AuthGuard],
                data: { role: UserRole.STAFF },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class MissionRoutingModule {}
