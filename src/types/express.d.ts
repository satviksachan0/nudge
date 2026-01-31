import 'express';

declare global {
  namespace Express {
    interface Request {
      userId: string;
      accountId: string;
    }
  }
}

export {};
