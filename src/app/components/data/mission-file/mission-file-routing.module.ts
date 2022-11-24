import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MissionFileComponent } from './mission-file.component';
import { MissionFileManagerComponent } from './manager/mission-file-manager.component';
import { AuthGuard } from '../../../helpers/auth.guard';
import { UserRole } from '../../../models/user-role';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: MissionFileComponent },
            {
                path: 'manage',
                component: MissionFileManagerComponent,
                canActivate: [AuthGuard],
                data: { role: UserRole.ADMIN },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class MissionFileRoutingModule {}
