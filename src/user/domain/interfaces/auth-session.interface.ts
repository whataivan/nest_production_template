export interface IAuthSession {
  id: number;
  userId: number;
  ip: string;
  createdAt: Date;
  issuedAt: Date;
  expireAt: Date;
}
