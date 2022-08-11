import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MapComponent } from './map.component';
import { MapManageComponent } from './manage/map-manage.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: MapComponent },
            { path: 'manage', component: MapManageComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class MapRoutingModule {}
