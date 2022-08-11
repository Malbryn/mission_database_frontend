import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MissionFileComponent } from './mission-file.component';
import { MissionFileManageComponent } from './manage/mission-file-manage.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: MissionFileComponent },
            { path: 'manage', component: MissionFileManageComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class MissionFileRoutingModule {}
