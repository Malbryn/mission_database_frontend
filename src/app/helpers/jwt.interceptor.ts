import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const user = this.authService.userValue;
        const isLoggedIn = user && user.access;
        const isApiUrl = request.url.startsWith(environment.API_URL);

        if (isLoggedIn && isApiUrl) {
            let headers = new HttpHeaders({
                Authorization: `Bearer ${user.access}`,
                'Content-Type': 'application/json',
            });

            if (request.url && request.url.indexOf('mission_files') !== -1) {
                headers = new HttpHeaders({
                    Authorization: `Bearer ${user.access}`,
                    'Content-Type': 'multipart/form-data',
                });
            }

            request = request.clone({ headers });
        }

        return next.handle(request);
    }
}
