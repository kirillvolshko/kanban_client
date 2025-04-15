export interface IBoardResponse {
  id: string;
  created_at: string;
  title: string;
  owner_id: string;
}

export interface ICreateBoard {
  title: string;
  owner_id: string;
}
