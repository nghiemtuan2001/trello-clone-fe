export interface TodoType {
  id?: string | number;
  name?: string;
  priority?: string;
  boardId?: string | number;
  startTime?: string;
  expireTime?: string;
  description?: string;
  color?: string;
  order?: number;
  completed?: boolean;
}

export interface GetTodosRequest {
  boardId: number | string;
  filterName?: string;
  filterPriority?: string;
  filterCompleted?: string;
}

export interface GetTodoRequest {
  id: number | string;
  boardId: number | string;
}

export interface GetTodosResponse {
  todos: TodoType[];
}

export interface DeleteTodoRequest extends GetTodoRequest {}
