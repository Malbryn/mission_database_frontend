import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GameTypeComponent } from './game-type.component';
import { GameTypeManagerComponent } from './manager/game-type-manager.component';
import { AuthGuard } from '../../../helpers/auth.guard';
import { UserRole } from '../../../models/user-role';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: GameTypeComponent },
            {
                path: 'manage',
                component: GameTypeManagerComponent,
                canActivate: [AuthGuard],
                data: { role: UserRole.ADMIN },
            },
        ]),
    ],
    exports: [RouterModule],
})
export class GameTypeRoutingModule {}
