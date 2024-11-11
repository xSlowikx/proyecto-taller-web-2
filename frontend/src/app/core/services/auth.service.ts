import { Injectable } from '@angular/core';
import {
  ApiGenericService,
  ApiMultipartService,
  ApiService,
} from './api.service';
import { HttpClient } from '@angular/common/http';
import { ENVIRONMENT } from '../../../environments/environment';
import { ENDPOINTS } from '../constants/endpoints';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TareaService extends ApiGenericService {
  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService,
    private apiMultiPartService: ApiMultipartService
  ) {
    super(httpClient, ENVIRONMENT.API_URL, ENDPOINTS.AUTH);
  }

  
}
