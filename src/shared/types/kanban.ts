export interface CardType {
  id: string;
  boardId: string;
  columnId: string;
  title: string;
  description: string;
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
  columnOrder: String[];
  columns: ColumnType[];
}
