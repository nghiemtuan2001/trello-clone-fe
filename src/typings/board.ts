export interface BoardType {
  id?: string | number;
  name: string;
  order?: number;
  userId: string | number;
}

export interface GetBoardsRequest {
  userId: number | string;
}

export interface GetBoardsResponse {
  boards: BoardType[];
}

export interface DeleteBoardRequest {
  id: string | number;
  userId: string | number;
}
