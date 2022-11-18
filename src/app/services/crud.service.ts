import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class CRUDService<T> {
    protected static readonly URL_BASE = environment.API_URL;
    protected URL: string;

    protected constructor(protected http: HttpClient, private url: string) {
        this.URL = CRUDService.URL_BASE + url;
    }

    create(value: FormData | Partial<any> | any): Observable<T> {
        return this.http.post<T>(this.URL, value).pipe();
    }

    delete(id: number): Observable<T> {
        return this.http.delete<T>(this.URL + id).pipe();
    }

    get(id: number): Observable<T> {
        return this.http.get<T>(this.URL + id).pipe();
    }

    getAll(): Observable<T[]> {
        return this.http.get<T[]>(this.URL).pipe();
    }

    update(id: number, value: FormData | Partial<any>): Observable<T> {
        return this.http.patch<T>(this.URL + id + '/', value).pipe();
    }

    patch(id: number, value: FormData | Partial<any>): Observable<T> {
        return this.http.patch<T>(this.URL + id + '/', value).pipe();
    }
}
