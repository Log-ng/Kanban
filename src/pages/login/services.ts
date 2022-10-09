import { URL_API } from '../../shared/urlServices/index';

import { AuthRequest, AuthResponse } from './../../shared/types/auth';
import axios from 'axios';

export const authLogin = (userLogin: AuthRequest): Promise<AuthResponse> => {
  return axios.post(URL_API, userLogin);
};
