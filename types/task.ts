export interface ITask {
  id: string;
  column_id: string;
  title: string;
  position: number;
  description?: string;
  start_date?: string;
  end_date?: string;
  priority?: "low" | "medium" | "high";
  assigned_to?: string;
  created_at: string;
}

export interface ICreateTask {
  title: string;
  column_id: string;
  position: number;
  description?: string;
  start_date?: string;
  end_date?: string;
  priority?: string;
  assigned_to?: string;
}

export interface IUpdateTask {
  title?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  priority?: string;
  assigned_to?: string;
  column_id?: string;
}

export interface IMoveTask {
  id: string;
  position: number;
  column_id?: string;
}
