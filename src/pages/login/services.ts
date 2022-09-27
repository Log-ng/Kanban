import { LOGIN_API } from '../../shared/urlServices/index';

import { UserLogin, AuthResponse } from './../../shared/types/auth';
import { myAxios } from 'shared/urlServices';

export const authLogin = (userLogin: UserLogin): Promise<AuthResponse> => {
  return myAxios.post(LOGIN_API, userLogin);
};
