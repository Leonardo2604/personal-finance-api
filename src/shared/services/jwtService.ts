interface JwtService {
  create(userId: number, payload?: object): string;
  check(token: string): boolean;
  getUserId(token: string): number;
}

export default JwtService;
