export const containsSpecialChars = (str: string) => {
  const specialChars = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  return specialChars.test(str);
}

export const containsOnlyLetters = (str: string) => {
  return /^[a-zA-Z ]+$/.test(str);
};
