import Express from 'express'

// expressの型の拡張
declare global {
    namespace Express {
        export interface User {
            id: string;
            password: string;
        }
  }
}