import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MissionComponent } from './mission.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: MissionComponent }]),
    ],
    exports: [RouterModule],
})
export class MissionRoutingModule {}
