import { TokenResponse } from './../types/auth';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { appRouters } from 'shared/urlResources';


export const URL_API = 'http://localhost/Kanban/server/index.php';
// export const URL_API = window.location.origin + '/Kanban/server/index.php';

interface MyAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const myAxios = axios.create();

myAxios.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: getToken() ?? '',
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

myAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest: MyAxiosRequestConfig = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const response: TokenResponse = await axios.post(
        URL_API,
        {
          controller: CONTROLLER_ACCESS_TOKEN,
        },
        {
          headers: {
            Authorization: localStorage.getItem('refreshToken') ?? '',
          },
        }
      );
      if (response.data.status === 200) {
        localStorage.setItem('token', response.data.token);
        return myAxios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export { appRouters, myAxios };

export const CONTROLLER_LOGIN = 'login';
export const CONTROLLER_LOGOUT = 'logout';
export const CONTROLLER_SIGNUP = 'signUp';
export const CONTROLLER_GETUSER = 'getUser';
export const CONTROLLER_ACCESS_TOKEN = 'accessToken';
export const CONTROLLER_BOARDS = 'boards';
export const CONTROLLER_CARDS = 'cards';
export const CONTROLLER_COLUMNS = 'columns';
export const CONTROLLER_ADD_NEW_COLUMN = 'addNewColumn';
export const CONTROLLER_DELETE_COLUMN = 'deleteColumn';
export const CONTROLLER_DROP_COLUMN = 'dropColumn';
export const CONTROLLER_TITLE_COLUMN = 'titleColumn';
export const CONTROLLER_ADD_NEW_CARD = 'addNewCard';
export const CONTROLLER_UPDATE_CARD = 'updateCard';
export const CONTROLLER_DELETE_CARD = 'deleteCard';
export const CONTROLLER_SINGLE_CARD = 'card';
export const CONTROLLER_SINGLE_USER = 'user';
export const CONTROLLER_DROP_CARD_ONE_COLUMN = 'dropCardOneColumn';
export const CONTROLLER_DROP_CARD_MUL_COLUMN = 'dropCardMulCol';

const getToken = () => {
  return localStorage.getItem('token')
}
