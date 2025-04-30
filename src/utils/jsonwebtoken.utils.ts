import { UserJWTDAO } from '$entities/User'
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET as string

export function generateToken(payload: UserJWTDAO):string{
  return jwt.sign(payload, secret!, { expiresIn: "1d" });
}

export function verifyToken(token: string):UserJWTDAO{
  return jwt.verify(token, secret!) as UserJWTDAO;
}