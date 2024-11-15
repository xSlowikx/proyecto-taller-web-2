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
import { TaskDTO_In, TaskDTO_Out } from '../models/task/task.model';

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

  async getAllTareas(): Promise<TaskDTO_In[]> { // ok
    return await this.apiService
      .get<any>(ENVIRONMENT.API_URL, ENDPOINTS.TAREA_ALL)
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

  //ok
  async taskDetail(id: number): Promise<TaskDTO_In> { // para el edit o el ver tarea
    return await this.apiService
      .get<any>(ENVIRONMENT.API_URL, ENDPOINTS.TAREA_DETAIL, id.toString())
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

  async eliminarTareaById(id: number): Promise<void> { // este esta ok
    const url = `${ENVIRONMENT.API_URL}${ENDPOINTS.TAREA_DELETE}/${id}`;
    return await this.httpClient.put<void>(url, {}).toPromise();
  }

  async updateTask(tarea: TaskDTO_Out): Promise<any> {
    const data = this.generarFormDataCrear(tarea);
    return await this.apiMultiPartService
      .put<any>(ENVIRONMENT.API_URL, ENDPOINTS.TAREA_UPDATE, data)
      .toPromise();
  }
  
  async creatTask(tarea: TaskDTO_Out): Promise<any> {
    var data = this.generarFormDataCrear(tarea);
    return await this.apiMultiPartService
      .post<any>(ENVIRONMENT.API_URL, ENDPOINTS.TAREA_CREATE, data)
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

  generarFormDataCrear(tarea: TaskDTO_Out) {
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
    
    return formData;
  }
}
