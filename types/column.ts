export interface IColumnResponse {
  id: string;
  board_id: string;
  title: string;
  position: number;
}

export interface ICreateColumn {
  title: string;
  board_id: string;
  position: number;
}

export interface IUpdateColumnTitle {
  id: string;
  title: string;
}

export interface IMoveColumn {
  id: string;
  position: number;
}
