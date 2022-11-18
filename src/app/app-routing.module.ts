import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './components/notfound/notfound.component';
import { AppLayoutComponent } from './components/layout/app.layout.component';
import { AccessComponent } from './components/auth/access/access.component';
import { Role } from './models/role';
import { AuthGuard } from './helpers/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppLayoutComponent,
                    loadChildren: () =>
                        import('./components/dashboard/dashboard.module').then(
                            (module) => module.DashboardModule
                        ),
                    canActivate: [AuthGuard],
                    data: { roles: [Role.MEMBER] },
                },
                {
                    path: 'data',
                    component: AppLayoutComponent,
                    loadChildren: () =>
                        import('./components/data/data.module').then(
                            (module) => module.DataModule
                        ),
                    canActivate: [AuthGuard],
                    data: { roles: [Role.MEMBER] },
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./components/auth/auth.module').then(
                            (module) => module.AuthModule
                        ),
                },
                { path: 'notfound', component: NotFoundComponent },
                { path: 'notallowed', component: AccessComponent },
                { path: '**', redirectTo: 'notfound' },
            ],
            { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
