import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Blood_pressure } from './blood-pressure.model';
import { DateUtils } from 'ng-jhipster';
@Injectable()
export class Blood_pressureService {

    private resourceUrl = 'api/blood-pressures';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(blood_pressure: Blood_pressure): Observable<Blood_pressure> {
        let copy: Blood_pressure = Object.assign({}, blood_pressure);
        copy.timestamp = this.dateUtils.toDate(blood_pressure.timestamp);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(blood_pressure: Blood_pressure): Observable<Blood_pressure> {
        let copy: Blood_pressure = Object.assign({}, blood_pressure);

        copy.timestamp = this.dateUtils.toDate(blood_pressure.timestamp);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Blood_pressure> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            let jsonResponse = res.json();
            jsonResponse.timestamp = this.dateUtils
                .convertDateTimeFromServer(jsonResponse.timestamp);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<Response> {
        let options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: any) => this.convertResponse(res))
        ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }


    private convertResponse(res: any): any {
        let jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            jsonResponse[i].timestamp = this.dateUtils
                .convertDateTimeFromServer(jsonResponse[i].timestamp);
        }
        res._body = jsonResponse;
        return res;
    }

    private createRequestOption(req?: any): BaseRequestOptions {
        let options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            let params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }
}
