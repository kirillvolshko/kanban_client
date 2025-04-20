export interface IBoardResponse {
  id: string;
  created_at: string;
  title: string;
  owner_id: string;
}

export interface IAddUser {
  email: string;
  board_id: string;
}
export interface IDeleteUser {
  user_id: string;
  board_id: string;
}
export interface ICreateBoard {
  title: string;
  owner_id: string;
}
