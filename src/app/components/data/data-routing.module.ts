import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../helpers/auth.guard';
import { UserRole } from '../../models/user-role';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'dlcs',
                loadChildren: () =>
                    import('./dlc/dlc.module').then(
                        (module) => module.DLCModule
                    ),
                canActivate: [AuthGuard],
                data: { role: UserRole.CREATOR },
            },
            {
                path: 'frameworks',
                loadChildren: () =>
                    import('./framework/framework.module').then(
                        (module) => module.FrameworkModule
                    ),
                canActivate: [AuthGuard],
                data: { role: UserRole.CREATOR },
            },
            {
                path: 'game-types',
                loadChildren: () =>
                    import('./game-type/game-type.module').then(
                        (module) => module.GameTypeModule
                    ),
                canActivate: [AuthGuard],
                data: { role: UserRole.CREATOR },
            },
            {
                path: 'maps',
                loadChildren: () =>
                    import('./map/map.module').then(
                        (module) => module.MapModule
                    ),
                canActivate: [AuthGuard],
                data: { role: UserRole.CREATOR },
            },
            {
                path: 'missions',
                loadChildren: () =>
                    import('./mission/mission.module').then(
                        (module) => module.MissionModule
                    ),
                canActivate: [AuthGuard],
                data: { role: UserRole.MEMBER },
            },
            {
                path: 'mission-files',
                loadChildren: () =>
                    import('./mission-file/mission-file.module').then(
                        (module) => module.MissionFileModule
                    ),
                canActivate: [AuthGuard],
                data: { role: UserRole.CREATOR },
            },
            {
                path: 'modsets',
                loadChildren: () =>
                    import('./modset/modset.module').then(
                        (module) => module.ModsetModule
                    ),
                canActivate: [AuthGuard],
                data: { role: UserRole.CREATOR },
            },
            {
                path: 'statuses',
                loadChildren: () =>
                    import('./status/status.module').then(
                        (module) => module.StatusModule
                    ),
                canActivate: [AuthGuard],
                data: { role: UserRole.CREATOR },
            },
            { path: '**', redirectTo: '/' },
        ]),
    ],
    exports: [RouterModule],
})
export class DataRoutingModule {}
