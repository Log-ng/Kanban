import { URL_API } from '../../shared/urlServices/index';

import { myAxios } from 'shared/urlServices';
import { LogoutRequest, LogoutResponse } from 'shared/types/auth';

export const logout = (user: LogoutRequest): Promise<LogoutResponse> => {
  return myAxios.post(URL_API, user, {
    headers: {
      Authorization: localStorage.getItem('token') ?? '',
    },
  });
};
