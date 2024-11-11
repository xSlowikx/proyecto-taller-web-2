import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../models/api/api.response';


export class ApiGenericService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'X-Content-Type-Options': 'NOSNIFF',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Permitted-Cross-Domain-Policies': 'master-only',
      'X-XSS-Protection': '1;mode=block',
      'Access-Control-Allow-Origin': '*',
      'Referrer-Policy': 'strict-origin',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    }),
  };

  constructor(
    private http: HttpClient,
    private apiUrl: string,
    private serviceEndpoint: string
  ) {}

  /**
   * Get genérico de un objeto
   * @param id - Id del objeto
   * @returns - DTOOut genérico del objeto
   */
  public get<T>(id?: number): Observable<T> {
    let url = `${this.apiUrl}${this.serviceEndpoint}`;
    if (id) {
      url += `/${id}`;
    }
    return this.http.get<ApiResponse>(url, this.httpOptions).pipe(
      map((res) => {
        if (!res.isError) return res.result;
        else return res.responseException;
      })
    );
  }

  /**
   * GetList genérico de un objeto
   * @returns - Lista de DTOOut genérico del objeto
   */
  public getList<T>(): Observable<T[]> {
    let url = `${this.apiUrl}${this.serviceEndpoint}`;
    return this.http.get<ApiResponse>(url, this.httpOptions).pipe(
      map((res) => {
        if (!res.isError) return res.result;
        else return res.responseException;
      })
    );
  }

  /**
   * Post genérico de un objeto
   * @param item - Objeto
   * @returns - DTOOut genérico del objeto
   */
  public post<T>(item: object): Observable<T> {
    return this.http
      .post<ApiResponse>(
        `${this.apiUrl}${this.serviceEndpoint}`,
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(
        map((res) => {
          if (!res.isError) return res.result;
          else return res.responseException;
        })
      );
  }

  public getWithParameters<T>(
    apiUrl: string,
    serviceEndpoint: string,
    params: HttpParams
  ): Observable<T> {
    let url = `${apiUrl}${serviceEndpoint}`;
    return this.http
      .get<ApiResponse>(url, {
        headers: this.httpOptions.headers,
        params: params,
      })
      .pipe(
        map((res) => {
          if (!res.isError) return res.result;
          else return res.responseException;
        })
      );
  }

  /**
   * Put genérico de un objeto
   * @param item - Objeto
   * @param id - Id del objeto
   * @returns - DTO Out genérico del objeto
   */
  public put<T>(item: T, id: number): Observable<T> {
    let url = `${this.apiUrl}${this.serviceEndpoint}`;
    if (id) {
      url += `/${id}`;
    }
    return this.http
      .put<ApiResponse>(`${url}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        map((res) => {
          if (!res.isError) return res.result;
          else return res.responseException;
        })
      );
  }

  /**
   * Delete genérico de un objeto
   * @param id - Id del objeto
   * @returns - DTOOut genérico del objeto
   */
  public delete<T>(id?: number): Observable<T> {
    let url = `${this.apiUrl}${this.serviceEndpoint}`;
    if (id) {
      url += `/${id}`;
    }
    return this.http.delete<ApiResponse>(url, this.httpOptions).pipe(
      map((res) => {
        if (!res.isError) return res.result;
        else return res.responseException;
      })
    );
  }
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'X-Content-Type-Options': 'NOSNIFF',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Permitted-Cross-Domain-Policies': 'master-only',
      'X-XSS-Protection': '1;mode=block',
      'Referrer-Policy': 'strict-origin',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    }),
  };

  constructor(private http: HttpClient) {}

  /**
   * Get de un objeto
   * @param apiUrl - URL de la API
   * @param serviceEndpoint - Endpoint del método
   * @param id - Id del objeto
   * @returns - DTOOut del objeto
   */
  public get<T>(
    apiUrl: string,
    serviceEndpoint: string,
    id?: string
  ): Observable<T> {
    let url = `${apiUrl}${serviceEndpoint}`;
    if (id) {
      url += `/${id}`;
    }
    return this.http.get<ApiResponse>(url, this.httpOptions).pipe(
      map((res) => {
        if (!res.isError) return res.result;
        else return res.responseException;
      })
    );
  }

  /**
   * Post de un objeto
   * @param apiUrl - URL de la API
   * @param serviceEndpoint - Endpoint del método
   * @param item - Objeto
   * @returns - DTOOut del objeto
   */
  public post<T>(
    apiUrl: string,
    serviceEndpoint: string,
    item: object
  ): Observable<T> {
    return this.http
      .post<ApiResponse>(
        `${apiUrl}${serviceEndpoint}`,
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(
        map((res) => {
          if (!res.isError) return res.result;
          else return res.responseException;
        })
      );
  }

  /**
   * Put de un objeto
   * @param apiUrl - URL de la API
   * @param serviceEndpoint - Endpoint del método
   * @param item - Objeto
   * @param id - Id del objeto
   * @returns - DTOOut del objeto
   */
  public put<T>(
    apiUrl: string,
    serviceEndpoint: string,
    item: T,
    id?: number
  ): Observable<T> {
    let url = `${apiUrl}${serviceEndpoint}`;
    if (id) {
      url += `/${id}`;
    }
    return this.http
      .put<ApiResponse>(`${url}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        map((res) => {
          if (!res.isError) return res.result;
          else return res.responseException;
        })
      );
  }

  /**
   * Delete de un objeto
   * @param apiUrl - URL de la API
   * @param serviceEndpoint - Endpoint del método
   * @param id - Id del objeto
   * @returns - DTOOut del objeto
   */
  public delete<T>(
    apiUrl: string,
    serviceEndpoint: string,
    id?: number
  ): Observable<T> {
    let url = `${apiUrl}${serviceEndpoint}`;
    if (id) {
      url += `/${id}`;
    }
    return this.http.delete<ApiResponse>(url, this.httpOptions).pipe(
      map((res) => {
        if (!res.isError) return res.result;
        else return res.responseException;
      })
    );
  }

  /**
   * Get de un objeto por parámetros
   * @param apiUrl - URL de la API
   * @param serviceEndpoint - Endpoint del método
   * @param params - Parámetros HTTP
   * @returns - DTOOut del objeto
   */
  public getWithParameters<T>(
    apiUrl: string,
    serviceEndpoint: string,
    params: HttpParams
  ): Observable<T> {
    let url = `${apiUrl}${serviceEndpoint}`;
    return this.http
      .get<ApiResponse>(url, {
        headers: this.httpOptions.headers,
        params: params,
      })
      .pipe(
        map((res) => {
          if (!res.isError) return res.result;
          else return res.responseException;
        })
      );
  }

  /**
   * Delete de un objeto por parámetros
   * @param apiUrl - URL de la API
   * @param serviceEndpoint - Endpoint del método
   * @param id - Id del objeto
   * @returns - DTOOut del objeto
   */
  public deleteWithParameters<T>(
    apiUrl: string,
    serviceEndpoint: string,
    params: HttpParams
  ): Observable<T> {
    let url = `${apiUrl}${serviceEndpoint}`;
    return this.http
      .delete<ApiResponse>(url, {
        headers: this.httpOptions.headers,
        params: params,
      })
      .pipe(
        map((res) => {
          if (!res.isError) return res.result;
          else return res.responseException;
        })
      );
  }

  /**
   * Put de un objeto por Id
   * @param apiUrl - URL de la API
   * @param serviceEndpoint - Endpoint del método
   * @param id - Id del objeto
   * @returns - DTOOut del objeto
   */
  public putWithId<T>(
    apiUrl: string,
    serviceEndpoint: string,
    id?: number
  ): Observable<T> {
    let url = `${apiUrl}${serviceEndpoint}`;
    if (id) {
      url += `/${id}`;
    }
    return this.http.put<ApiResponse>(`${url}`, this.httpOptions).pipe(
      map((res) => {
        if (!res.isError) return res.result;
        else return res.responseException;
      })
    );
  }
}

@Injectable({ providedIn: 'root' })
export class ApiMultipartService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data; charset=utf-8',
      'X-Content-Type-Options': 'NOSNIFF',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Permitted-Cross-Domain-Policies': 'master-only',
      'X-XSS-Protection': '1;mode=block',
      'Referrer-Policy': 'strict-origin',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    }),
  };

  constructor(private http: HttpClient) {}

  public put<T>(
    apiUrl: string,
    serviceEndpoint: string,
    formData: FormData,
    id?: number
  ): Observable<T> {
    let url = `${apiUrl}${serviceEndpoint}`;
    if (id) {
      url += `/${id}`;
    }
    return this.http.put<ApiResponse>(`${url}`, formData).pipe(
      map((res) => {
        if (!res.isError) return res.result;
        else return res.responseException;
      })
    );
  }

  public post<T>(
    apiUrl: string,
    serviceEndpoint: string,
    formData: FormData
  ): Observable<T> {
    return this.http
      .post<ApiResponse>(`${apiUrl}${serviceEndpoint}`, formData)
      .pipe(
        map((res) => {
          if (!res.isError) return res.result;
          else return res.responseException;
        })
      );
  }
}
