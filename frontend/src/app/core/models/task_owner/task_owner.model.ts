export interface TaskOwnerDTO_In {
    id_user: number | null;
    nombre: string | null;
    apellido: string | null;
    username: string | null;
    password: string | null;
  }
  
  export class TaskOwnerDTO_Out {
    id_user: number = 0;
    nombre: string = '';
    apellido: string = '';
    username: string = '';
    password: string = '';
  }