import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MissionComponent } from './mission.component';
import { MissionManagerComponent } from './manager/mission-manager.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: MissionComponent },
            { path: 'manage', component: MissionManagerComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class MissionRoutingModule {}
