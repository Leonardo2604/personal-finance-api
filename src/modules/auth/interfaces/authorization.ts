interface Authorization {
  token: string;
  tokenExpiresIn: number;
  refreshToken?: string;
}

export default Authorization;
