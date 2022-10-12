import { ColumnRequest, ColumnType, DropRequest, CardRequest } from './../../shared/types/kanban';
import {
  CONTROLLER_CARDS,
  CONTROLLER_COLUMNS,
  CONTROLLER_SINGLE_CARD,
} from '../../shared/urlServices/index';
import { URL_API } from '../../shared/urlServices/index';

import { myAxios } from 'shared/urlServices';
import { KanbanResponse } from 'shared/types/kanban';

export const getColumns = (boardId: string): Promise<KanbanResponse> => {
  const paramUrl = `${URL_API}?&controller=${CONTROLLER_COLUMNS}&boardId=${boardId}`;
  const res = myAxios.get(paramUrl);
  return res;
};

export const getCards = async (columnId: string): Promise<KanbanResponse> => {
  const paramUrl = `${URL_API}?&controller=${CONTROLLER_CARDS}&columnId=${columnId}`;
  const res = await myAxios.get(paramUrl);
  return res;
};

export const getCardToColumn = (columns: ColumnType[]): ColumnType[] => {
  let newColumns = columns;
  newColumns.forEach(async (column, index) => {
    const res = await getCards(column.id);
    newColumns[index].cards = res.data.cards ?? [];
  });
  return newColumns;
}

export const addNewColumnService = (column: ColumnRequest): Promise<KanbanResponse> => {
  return myAxios.post(URL_API, column);
};

export const deleteColumnService = (column: ColumnRequest): Promise<KanbanResponse> => {
  return myAxios.delete(URL_API, {data: column});
};

export const onDropColumnService = (dropColumn: DropRequest): Promise<KanbanResponse> => {
  return myAxios.put(URL_API, dropColumn);
}

export const onTitleColumnService = (column: ColumnRequest): Promise<KanbanResponse> => {
  return myAxios.put(URL_API, column);
}

export const addNewCardService = (card: CardRequest): Promise<KanbanResponse> => {
  return myAxios.post(URL_API, card);
};

export const updateCardService = (card: CardRequest): Promise<KanbanResponse> => {
  return myAxios.put(URL_API, card);
}

export const deleteCardService = (card: CardRequest): Promise<KanbanResponse> => {
  return myAxios.delete(URL_API, { data: card });
};

export const getSingleCard = (boardId: string, cardId: string): Promise<KanbanResponse> => {
  const paramUrl = `${URL_API}?&controller=${CONTROLLER_SINGLE_CARD}&boardId=${boardId}&cardId=${cardId}`;
  return myAxios.get(paramUrl);
};

export const onDropCardOneColumnService = (dropCard: DropRequest): Promise<KanbanResponse> => {
  return myAxios.put(URL_API, dropCard);
}

export const onDropCardMulColService = (dropCard: DropRequest): Promise<KanbanResponse> => {
  return myAxios.put(URL_API, dropCard);
}
