import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GameTypeComponent } from './game-type.component';
import { GameTypeManageComponent } from './manage/game-type-manage.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: GameTypeComponent },
            { path: 'manage', component: GameTypeManageComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class GameTypeRoutingModule {}
