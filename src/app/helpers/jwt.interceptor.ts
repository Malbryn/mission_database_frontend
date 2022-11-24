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
        const currentUser = this.authService.currentUser.value;
        const accessToken = currentUser.accessToken;
        const isLoggedIn = currentUser && accessToken;
        const isApiUrl = request.url.startsWith(environment.API_URL);

        if (isLoggedIn && isApiUrl) {
            const headers = new HttpHeaders({
                Authorization: `Bearer ${currentUser.accessToken}`,
            });

            request = request.clone({ headers });
        }

        return next.handle(request);
    }
}
