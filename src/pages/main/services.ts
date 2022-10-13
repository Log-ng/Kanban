import { CONTROLLER_BOARDS } from './../../shared/urlServices/index';
import { URL_API } from '../../shared/urlServices/index';

import { myAxios } from 'shared/urlServices';
import { KanbanResponse } from 'shared/types/kanban';

export const getBoards = (): Promise<KanbanResponse> => {
  const paramUrl = `${URL_API}?&controller=${CONTROLLER_BOARDS}`;
  return myAxios.get(paramUrl);
};
