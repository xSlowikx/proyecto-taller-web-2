export interface TaskDTO_In {
  id_task: number;
  title: string;
  description: string;
  created_at: string;
  modified_at: string | null;
  completed_at: string | null;
  user_id: number;
  priority_id: number;
  state_id: number | null;
}

export class TaskDTO_Out {
  id_task: number = 0;
  title: string = '';
  description: string = '';
  created_at: string = '';
  modified_at: string | null = '';
  completed_at: string | null = ''; 
  user_id: number = 0;
  priority_id: number = 0;
  state_id: number | null = 0;
}
