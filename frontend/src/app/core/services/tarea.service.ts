import { Injectable } from '@angular/core';
import {
  ApiGenericService,
  ApiMultipartService,
  ApiService,
} from './api.service';
import { HttpClient } from '@angular/common/http';
import { ENVIRONMENT } from '../../../environments/environment';
import { ENDPOINTS } from '../constants/endpoints';
import { catchError, lastValueFrom, map, of } from 'rxjs';
import { TaskDTO_In, TaskDTO_Out } from '../models/task/task.model';
;

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



  getTasks() {
    return this.httpClient
      .get<any[]>(`${ENVIRONMENT.API_URL}${ENDPOINTS.TAREA_ALL}`, {
        withCredentials: true,
      })
      .pipe(
        map((tasks: any[]) =>
          tasks.map(
            (task) =>
              new TaskDTO_In(
                task.id_task,
                task.title,
                task.description,
                task.created_at,
                task.modified_at,
                task.completed_at,
                task.user_id,
                task.priority_id,
                task.state_id
              )
          )
        )
      );
  }

 
  taskDetail(id: number): Promise<TaskDTO_In | null> {
    return this.httpClient
      .get<any>(`${ENVIRONMENT.API_URL}${ENDPOINTS.TAREA_DETAIL}/${id}`, {
        withCredentials: true,
      })
      .pipe(
        map((response) => {
          
          if (response && response.task) {
            const task = response.task;
            return new TaskDTO_In(
              task.id_task,
              task.title,
              task.description,
              task.created_at,
              task.modified_at,
              task.completed_at,
              task.user_id,
              task.priority_id,
              task.state_id
            );
          }
         
          return null;
        }),
        catchError(() => {
          
          return of(null);
        })
      )
      .toPromise() as Promise<TaskDTO_In | null>;
  }

  async eliminarTareaById(id: number): Promise<void> {
    const url = `${ENVIRONMENT.API_URL}${ENDPOINTS.TAREA_DELETE}/${id}`;
    return this.httpClient.put<void>(url, {}).toPromise();
  }

  async updateTask(tarea: TaskDTO_Out): Promise<any> {
    console.log('Datos enviados al backend para actualización:', tarea); 
  
    try {
      const url = `${ENVIRONMENT.API_URL}${ENDPOINTS.TAREA_UPDATE}/${tarea.id_task}`;
      const response = await this.httpClient.put<any>(url, tarea, {
        headers: { 'Content-Type': 'application/json' },
      }).toPromise();
  
      return response || null;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }
  
  
  
  
  
  async createTask(tarea: TaskDTO_Out): Promise<any> {
    console.log('Datos enviados al backend:', JSON.stringify(tarea)); 
    try {
      const response = await lastValueFrom(
        this.httpClient.post<any>(
          `${ENVIRONMENT.API_URL}${ENDPOINTS.TAREA_CREATE}`,
          tarea, 
          {
            headers: { 'Content-Type': 'application/json' },
          }
        )
      );
      return response || null;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }
  

  generarFormDataCrear(tarea: TaskDTO_Out): FormData {
    const formData = new FormData();
  
   
    formData.append('id_task', tarea.id_task?.toString() || '');
    formData.append('title', tarea.title || '');
    formData.append('description', tarea.description || '');
    formData.append('priority_id', tarea.priority_id?.toString() || '');
    formData.append('state_id', tarea.state_id?.toString() || '');
    formData.append('created_at', tarea.created_at || '');
    formData.append('modified_at', tarea.modified_at || '');
    formData.append('completed_at', tarea.completed_at || '');
  
    return formData;
  }
  
}
