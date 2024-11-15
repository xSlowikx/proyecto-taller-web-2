export interface TaskOwnerDTO_In {
    id_user: number;
    nombre: string;
    apellido: string;
    username: string;
    password: string;
  }
  
  export class TaskOwnerDTO_Out {
    id_user: number = 0;
    nombre: string = '';
    apellido: string = '';
    username: string = '';
    password: string = '';
  }