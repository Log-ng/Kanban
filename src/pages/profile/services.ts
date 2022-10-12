import { CONTROLLER_SINGLE_USER } from './../../shared/urlServices/index';

import { URL_API } from '../../shared/urlServices/index';

import { myAxios } from 'shared/urlServices';
import { GetUserSingle } from 'shared/types/user';

export const getSingleUser = (): Promise<GetUserSingle> => {
  const paramUrl = `${URL_API}?&controller=${CONTROLLER_SINGLE_USER}`;
  return myAxios.get(paramUrl);
};
