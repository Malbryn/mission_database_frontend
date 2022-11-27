import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './components/layout/app.layout.module';
import { NotFoundComponent } from './components/notfound/notfound.component';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './helpers/auth.guard';
import { DLCService } from './services/dlc.service';
import { GameTypeService } from './services/game-type.service';
import { MapService } from './services/map.service';
import { MissionService } from './services/mission.service';
import { MissionFileService } from './services/mission-file.service';
import { ModsetService } from './services/modset.service';
import { StatusService } from './services/status.service';
import { FrameworkService } from './services/framework.service';

@NgModule({
    declarations: [AppComponent, NotFoundComponent],
    imports: [AppRoutingModule, AppLayoutModule],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        AuthService,
        AuthGuard,
        DLCService,
        FrameworkService,
        GameTypeService,
        MapService,
        MissionService,
        MissionFileService,
        ModsetService,
        StatusService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
