export interface BoardType {
  id: string | number;
  name: string;
  order: number;
}

export interface TodoType {
  id: string | number;
  name: string;
  priority: Priorities;
  startTime?: Date;
  expireTime?: Date;
  description: string;
  color?: string;
  completed: boolean;
}

export enum Priorities {
  LOW,
  MEDIUM,
  HIGH,
}
