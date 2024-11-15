import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ENVIRONMENT } from '../../../environments/environment';
import { ENDPOINTS } from '../constants/endpoints';
import { firstValueFrom } from 'rxjs';
import { StateDTO_In } from '../models/state/state.model';

@Injectable({
  providedIn: 'root',
})
export class PriorityService {
  constructor(private httpClient: HttpClient, private apiService: ApiService) {}


  async getAllState(): Promise<StateDTO_In[]> {
    return await this.apiService
      .get<any>(ENVIRONMENT.API_URL, ENDPOINTS.STATE)
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
