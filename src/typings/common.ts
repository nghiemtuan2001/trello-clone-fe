export enum Priorities {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

export interface BoardType {
  id: string | number;
  name: string;
  order: number;
}
