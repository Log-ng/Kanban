import { CONTROLLER_GETUSER } from './../../shared/urlServices/index';
import { URL_API } from '../../shared/urlServices/index';

import { myAxios } from 'shared/urlServices';
import { GetUserResponse } from 'shared/types/user';

export const getUser = (currentPage: number, recordPerPage: number): Promise<GetUserResponse> => {
  const paramUrl = `${URL_API}?&controller=${CONTROLLER_GETUSER}&currentPage=${currentPage}&recordPerPage=${recordPerPage}`;  
  return myAxios.get(paramUrl);
};
