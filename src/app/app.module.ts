import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './components/layout/app.layout.module';
import { NotFoundComponent } from './components/notfound/notfound.component';
import { MissionService } from './services/mission.service';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './helpers/auth.guard';

@NgModule({
    declarations: [AppComponent, NotFoundComponent],
    imports: [AppRoutingModule, AppLayoutModule],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        AuthService,
        AuthGuard,
        MissionService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
