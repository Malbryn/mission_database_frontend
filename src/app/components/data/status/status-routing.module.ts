import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StatusComponent } from './status.component';
import { StatusManageComponent } from './manage/status-manage.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: StatusComponent },
            { path: 'manage', component: StatusManageComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class StatusRoutingModule {}
