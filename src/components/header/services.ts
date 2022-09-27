import { User } from 'shared/types/user';
import { LOGOUT_API } from '../../shared/urlServices/index';

import { myAxios } from 'shared/urlServices';

export const logout = (user: User) => {
  myAxios.post(LOGOUT_API, user)
};
