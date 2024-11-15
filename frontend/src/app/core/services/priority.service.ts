import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ENVIRONMENT } from '../../../environments/environment';
import { ENDPOINTS } from '../constants/endpoints';
import { firstValueFrom } from 'rxjs';
import { PriorityDTO_In } from '../models/priority/priority.model';

@Injectable({
  providedIn: 'root',
})
export class PriorityService {
  constructor(private httpClient: HttpClient, private apiService: ApiService) {}


  async getAllPriority(): Promise<PriorityDTO_In[]> {
    return await this.apiService
      .get<any>(ENVIRONMENT.API_URL, ENDPOINTS.PRIORITY)
      .pipe(
        map((response) => {
          if (response) {
            return response;
          }
          return null;
        })
      )
      .toPromise();
  }
}
