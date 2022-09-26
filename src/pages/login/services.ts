import { LOGIN_API } from './../../shared/url.services/index';

import { UserLogin, AuthResponse } from './../../shared/types/auth';
import { myAxios } from 'shared/url.services';

export const authLogin = (userLogin: UserLogin): Promise<AuthResponse> => {
  return myAxios.post(LOGIN_API, userLogin);
};
