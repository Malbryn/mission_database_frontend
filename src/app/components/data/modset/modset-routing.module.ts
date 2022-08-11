import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModsetComponent } from './modset.component';
import { ModsetManageComponent } from './manage/modset-manage.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: ModsetComponent },
            { path: 'manage', component: ModsetManageComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class ModsetRoutingModule {}
