import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DLCComponent } from './dlc.component';
import { DLCManageComponent } from './manage/dlc-manage.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: DLCComponent },
            { path: 'manage', component: DLCManageComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class DLCRoutingModule {}
