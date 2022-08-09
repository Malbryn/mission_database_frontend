import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './components/notfound/notfound.component';
import { AppLayoutComponent } from './components/layout/app.layout.component';
import { AccessComponent } from './components/auth/access/access.component';
import { Role } from './models/Role';
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
                            (m) => m.DashboardModule
                        ),
                    canActivate: [AuthGuard],
                    data: { roles: [Role.MEMBER] },
                },
                {
                    path: 'data',
                    component: AppLayoutComponent,
                    loadChildren: () =>
                        import('./components/data/data.module').then(
                            (m) => m.DataModule
                        ),
                    canActivate: [AuthGuard],
                    data: { roles: [Role.ADMIN] },
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./components/auth/auth.module').then(
                            (m) => m.AuthModule
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
