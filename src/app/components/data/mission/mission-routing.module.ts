import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MissionComponent } from './mission.component';
import { MissionManageComponent } from './manage/mission-manage.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: MissionComponent },
            { path: 'manage', component: MissionManageComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class MissionRoutingModule {}
