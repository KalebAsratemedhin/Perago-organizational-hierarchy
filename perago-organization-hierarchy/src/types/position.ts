export interface Position {
    id: number;
    name: string;
    description: string;
    parentId: number;
  }
  
export interface PositionFormValues {
  name: string;
  description: string;
  parentId: number;
}