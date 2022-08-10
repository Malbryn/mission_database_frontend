import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export abstract class CRUDService<T> {
    protected static readonly URL_BASE = environment.API_URL;
    protected URL: string;

    protected constructor(protected http: HttpClient, private url: string) {
        this.URL = CRUDService.URL_BASE + url;
    }

    create(value: T): Observable<T> {
        return this.http
            .post<T>(this.URL, value)
            .pipe(catchError(this.handleError));
    }

    delete(id: number): Observable<T> {
        return this.http
            .delete<T>(this.URL + id)
            .pipe(catchError(this.handleError));
    }

    get(id: number): Observable<T> {
        return this.http
            .get<T>(this.URL + id)
            .pipe(catchError(this.handleError));
    }

    getAll(): Observable<T[]> {
        return this.http.get<T[]>(this.URL).pipe(catchError(this.handleError));
    }

    update(value: T): Observable<T> {
        return this.http
            .delete<T>(this.URL, value)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        if (error.status === 0) {
            console.error('An error occurred: ', error.error);
        } else {
            console.error(
                `Backend returned code ${error.status}, body was: `,
                error.error
            );
        }

        return throwError(
            () => new Error('Something bad happened, please try again later.')
        );
    }
}
