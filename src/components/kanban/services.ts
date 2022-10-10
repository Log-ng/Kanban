import { ColumnRequest } from './../../shared/types/kanban';
import {
  CONTROLLER_CARDS,
  CONTROLLER_COLUMNS,
} from '../../shared/urlServices/index';
import { URL_API } from '../../shared/urlServices/index';

import { myAxios } from 'shared/urlServices';
import { KanbanResponse } from 'shared/types/kanban';

export const getColumns = (boardId: string): Promise<KanbanResponse> => {
  const paramUrl = `${URL_API}?&controller=${CONTROLLER_COLUMNS}&boardId=${boardId}`;
  return myAxios.get(paramUrl);
};

export const getCards = (columnId: string): Promise<KanbanResponse> => {
  const paramUrl = `${URL_API}?&controller=${CONTROLLER_CARDS}&columnId=${columnId}`;
  return myAxios.get(paramUrl);
};

export const addNewColumnService = (column: ColumnRequest): Promise<KanbanResponse> => {
  return myAxios.post(URL_API, column);
};

export const deleteColumnService = (column: ColumnRequest): Promise<KanbanResponse> => {
  return myAxios.delete(URL_API, {data: column});
};