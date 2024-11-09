export interface TareaDTO_In {
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
  