export interface TareaTablaDTO_In {
  id_task: number;
  title: string;
  description: string;
  created_at: string;
  //modified_at: string | null;
  //completed_at: string | null;
  //user_id: number; si tenes task, tambien user. al pepe 
  priority_id: number;
  state_id: number | null;
}

export interface TareaDTO_In {
  rowClass: string;
  id_task: number;
  title: string;
  description: string;
  created_at: string;
  modified_at: string | null;
  completed_at: string | null;
  //user_id: number; si tenes task, tambien user. al pepe 
  priority_id: number;
  state_id: number | null;
}

export class TareaDTO_Out {
  id_task: number = 0;
  title: string = '';
  description: string = '';
  //created_at: string = '';
  //modified_at: string | null = '';
  //completed_at: string | null = ''; // se completa en el back
  user_id: number = 0;
  priority_id: number = 0;
  state_id: number | null = 0;
}
