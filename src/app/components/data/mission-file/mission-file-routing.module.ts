import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MissionFileComponent } from './mission-file.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: MissionFileComponent }]),
    ],
    exports: [RouterModule],
})
export class MissionFileRoutingModule {}
