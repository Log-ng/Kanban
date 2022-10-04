import myAxios from 'axios';
import { appRouters } from 'shared/urlResources';

export const URL_API = 'http://localhost/Kanban/server/index.php';

export { appRouters, myAxios };

export const CONTROLLER_LOGIN = 'login';
export const CONTROLLER_LOGOUT = 'logout';
export const CONTROLLER_SIGNUP = 'signUp';
