export interface CardType {
  id: string;
  boardId: string;
  columnId: string;
  title: string;
  description: string;
  priority?: string;
}

export interface ColumnType {
  id: string;
  boardId: string;
  title: string;
  cardOrder: string[];
  cards: CardType[];
}

export interface BoardType {
  id: string;
  boardName: string;
  columnOrder: String[];
  columns: ColumnType[];
}

  export interface DropResult {
    removedIndex: number;
    addedIndex: number;
    payload: object;
    element: HTMLElement;
  }
