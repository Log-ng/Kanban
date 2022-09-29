import { URL_API } from '../../shared/urlServices/index';

import { myAxios } from 'shared/urlServices';
import { LogoutRequest } from 'shared/types/auth';

export const logout = (user: LogoutRequest) => {
  myAxios.post(URL_API, user);
};
