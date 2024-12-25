export interface Position {
    id: number;
    name: string;
    description: string;
    parentId: number | null;
  }
  
  export interface CreatePosition {
    name: string;
    description: string;
    parentId: number | null;
  }
  