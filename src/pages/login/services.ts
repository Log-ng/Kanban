import { URL_API } from '../../shared/urlServices/index';

import { AuthRequest, AuthResponse } from './../../shared/types/auth';
import { myAxios } from 'shared/urlServices';

export const authLogin = (userLogin: AuthRequest): Promise<AuthResponse> => {
  return myAxios.post(URL_API, userLogin);
};
