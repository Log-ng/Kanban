import { AuthRequest, SignUpResponse } from './../../shared/types/auth';
import { URL_API } from '../../shared/urlServices/index';

import axios from 'axios';

export const signUp = (userSignUp: AuthRequest): Promise<SignUpResponse> => {  
  return axios.post(URL_API, userSignUp);
};
