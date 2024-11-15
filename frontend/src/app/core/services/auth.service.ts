import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ApiGenericService,
  ApiMultipartService,
  ApiService,
} from './api.service';
import { ENVIRONMENT } from '../../../environments/environment';
import { ENDPOINTS } from '../constants/endpoints';
import { map } from 'rxjs';
import { TaskOwnerDTO_In, TaskOwnerDTO_Out } from '../models/task_owner/task_owner.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiGenericService {
  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService,
    private apiMultiPartService: ApiMultipartService
  ) {
    super(httpClient, ENVIRONMENT.API_URL, ENDPOINTS.AUTH);
  }

  async login(
    credentials: TaskOwnerDTO_Out
  ): Promise<TaskOwnerDTO_In | null | undefined> {
    return await this.apiService
      .post<TaskOwnerDTO_In>(
        ENVIRONMENT.API_URL,
        ENDPOINTS.AUTH_LOGIN,
        credentials
      )
      .pipe(
        map((response) => {
          return response || null;
        })
      )
      .toPromise();
  }
  
  async sessionStatus(): Promise<{ message: string; user?: TaskOwnerDTO_In }> {
    const response = await this.apiService
      .get<{ message: string; user?: TaskOwnerDTO_In }>(
        ENVIRONMENT.API_URL,
        ENDPOINTS.AUTH_SESSION_STATUS
      )
      .toPromise();
    if (response) {
      return response;
    } else {
      return { message: 'No active session', user: undefined };
    }
  }
  
  async logout(): Promise<void> {
    return await this.apiService
      .post<void>(ENVIRONMENT.API_URL, ENDPOINTS.AUTH_LOGOUT, {})
      .toPromise();
  }
}
