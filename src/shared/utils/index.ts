import { myAxios, URL_API } from "shared/urlServices";

export const getNewAccessToken = () => {
  myAxios.post(URL_API, {
    headers: {
      Authorization: localStorage.getItem('refreshToken') ?? '',
    },
  }).then(res => {
    if(res.data.status === 'Success') {
      localStorage.setItem('token', res.data.token);
    }
    localStorage.clear();
  });
};