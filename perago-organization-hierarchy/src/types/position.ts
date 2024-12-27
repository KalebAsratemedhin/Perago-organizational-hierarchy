export interface Position {
    id: string;
    name: string;
    description: string;
    parentId: string;
  }
  
export interface PositionFormValues {
  name: string;
  description: string;
  parentId: string;
}