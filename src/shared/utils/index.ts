import { myAxios, URL_API } from "shared/urlServices";

export const containsSpecialChars = (str: string) => {
  const specialChars = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  return specialChars.test(str);
}

export const containsOnlyLetters = (str: string) => {
  return /^[a-zA-Z ]+$/.test(str);
};

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