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
        return this.http.post<T>(this.URL, value);
    }

    delete(id: number): Observable<T> {
        return this.http.delete<T>(this.URL + id);
    }

    get(id: number): Observable<T> {
        return this.http.get<T>(this.URL + id);
    }

    getAll(): Observable<T[]> {
        return this.http.get<T[]>(this.URL);
    }

    update(id: number, value: FormData | Partial<any>): Observable<T> {
        return this.http.patch<T>(this.URL + id + '/', value);
    }

    patch(id: number, value: FormData | Partial<any>): Observable<T> {
        return this.http.patch<T>(this.URL + id + '/', value);
    }

    downloadMissionFile(id: number): Observable<any> {
        const url = `${CRUDService.URL_BASE}/mission-files/${id}/download`;

        return this.http.get(url, {
            headers: {
                'Content-Type': 'application/octet-stream',
            },
            responseType: 'blob',
        });
    }
}
