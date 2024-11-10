import { Injectable } from '@angular/core';
import {
  ApiGenericService,
  ApiMultipartService,
  ApiService,
} from './api.service';
import { HttpClient } from '@angular/common/http';
import { ENVIRONMENT } from '../environments/environment';
import { ENDPOINTS } from '../core/constants/endpoints';
import { map } from 'rxjs';
import { TareaDTO_In, TareaTablaDTO_In, TareaDTO_Out } from '../models/tarea/tarea.model';

@Injectable({
  providedIn: 'root',
})
export class TareaService extends ApiGenericService {
  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService,
    private apiMultiPartService: ApiMultipartService
  ) {
    super(httpClient, ENVIRONMENT.API_URL, ENDPOINTS.TAREA);
  }

  async getAllTareas(): Promise<TareaTablaDTO_In[]> {
    return await this.apiService
      .get<any>(ENVIRONMENT.API_URL, ENDPOINTS.TAREA)
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

  async getById(id: number): Promise<TareaDTO_In> { // para el edit o el ver tarea
    return await this.apiService
      .get<any>(ENVIRONMENT.API_URL, ENDPOINTS.TAREA, id.toString())
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

  async eliminarTareaById(id: number): Promise<void> {
    const url = `${ENVIRONMENT.API_URL}${ENDPOINTS.TAREA_DELETE}/${id}`;
    return await this.httpClient.put<void>(url, {}).toPromise();
  }

  async editarTarea(tarea: TareaDTO_Out): Promise<any> {
    var data = this.generarFormDataCrear(tarea);
    return await this.apiMultiPartService
      .put<any>(ENVIRONMENT.API_URL, ENDPOINTS.TAREA, data)
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

  async crearTarea(tarea: TareaDTO_Out): Promise<any> {
    var data = this.generarFormDataCrear(tarea);
    return await this.apiMultiPartService
      .post<any>(ENVIRONMENT.API_URL, ENDPOINTS.TAREA, data)
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

  generarFormDataCrear(tarea: TareaDTO_Out) {
    var formData = new FormData();

    formData.append( // entre '' es como se llama en el back. - modificar.
      'id_task',
      tarea.id_task ? tarea.id_task.toString() : '0'
    );
    formData.append(
      'title',
      tarea.title ? tarea.title.toString() : '0'
    );
    formData.append(
      'description',
      tarea.description ? tarea.description.toString() : '0'
    );
    formData.append(
      'user_id',
      tarea.user_id ? tarea.user_id.toString() : '0'
    );
    formData.append(
      'priority_id',
      tarea.priority_id ? tarea.priority_id.toString() : '0'
    );
    formData.append(
      'state_id',
      tarea.state_id ? tarea.state_id.toString() : '0'
    );
    
    return formData;
  }
}
