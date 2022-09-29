import { AuthRequest, SignUpResponse } from './../../shared/types/auth';
import { URL_API } from '../../shared/urlServices/index';

import { myAxios } from 'shared/urlServices';

export const signUp = (userSignUp: AuthRequest): Promise<SignUpResponse> => {  
  return myAxios.post(URL_API, userSignUp);
};
