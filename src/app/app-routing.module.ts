import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './layout/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: '',
                            loadChildren: () =>
                                import(
                                    './layout/components/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'dlcs',
                            loadChildren: () =>
                                import(
                                    './layout/components/dlc/dlc.module'
                                ).then((m) => m.DLCModule),
                        },
                        {
                            path: 'game-types',
                            loadChildren: () =>
                                import(
                                    './layout/components/game-type/game-type.module'
                                ).then((m) => m.GameTypeModule),
                        },
                        {
                            path: 'maps',
                            loadChildren: () =>
                                import(
                                    './layout/components/map/map.module'
                                ).then((m) => m.MapModule),
                        },
                        {
                            path: 'missions',
                            loadChildren: () =>
                                import(
                                    './layout/components/mission/mission.module'
                                ).then((m) => m.MissionModule),
                        },
                        {
                            path: 'mission-files',
                            loadChildren: () =>
                                import(
                                    './layout/components/mission-file/mission-file.module'
                                ).then((m) => m.MissionFileModule),
                        },
                        {
                            path: 'modsets',
                            loadChildren: () =>
                                import(
                                    './layout/components/modset/modset.module'
                                ).then((m) => m.ModsetModule),
                        },
                        {
                            path: 'statuses',
                            loadChildren: () =>
                                import(
                                    './layout/components/status/status.module'
                                ).then((m) => m.StatusModule),
                        },
                    ],
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./layout/components/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                },
                { path: 'notfound', component: NotFoundComponent },
                { path: '**', redirectTo: 'notfound' },
            ],
            { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
