export const TOKEN_KEY = 'token';

export type Token = {
  raw: string,
  header: {
    kid: string,
    alg: string
  },
  payload: {
    sub: string,
    iss: string,
    exp: number
  },
  signature: string
}

export const saveToken = (token: Token) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
}

export const getToken = (): Token | undefined => {
  const tokenData = localStorage.getItem('token');
  if (tokenData) {
    return JSON.parse(tokenData);
  }

  return undefined;
}

export const deleteToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
}
