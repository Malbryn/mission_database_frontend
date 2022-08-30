import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DLCComponent } from './dlc.component';
import { DlcManagerComponent } from './manager/dlc-manager.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: DLCComponent },
            { path: 'manage', component: DlcManagerComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class DLCRoutingModule {}
