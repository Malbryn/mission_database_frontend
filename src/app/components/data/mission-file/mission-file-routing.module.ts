import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MissionFileComponent } from './mission-file.component';
import { MissionFileManagerComponent } from './manager/mission-file-manager.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: MissionFileComponent },
            { path: 'manage', component: MissionFileManagerComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class MissionFileRoutingModule {}
