export class TaskDTO_In {
  constructor(
    public id_task: number,
    public title: string,
    public description: string,
    public created_at: string,
    public modified_at: string | null,
    public completed_at: string | null,
    public user_id: number,
    public priority_id: number,
    public state_id: number | null,
  ) {}
}


export class TaskDTO_Out {
  id_task: number = 0;
  title: string = '';
  description: string = '';
  created_at: string = '';
  modified_at: string | null = '';
  completed_at: string | null = ''; 
  priority_id: number = 0;
  state_id: number | null = 0;
}
