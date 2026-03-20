import jwt from 'jsonwebtoken'
import {type Request , type Response , type NextFunction} from 'express'

interface TokenPayload extends jwt.JwtPayload{
  userId : string
}

interface customRequest extends Request {
  userId?: string;
}

enum ExtraInfo {
  WRONGINPUT = 400,
  USERDOESNOTEXISTS = 404,
  SUCCESS = 200,
  SERVERSIDEPROBLEM = 500,
  USERALREADYEXIST = 409,
  INVALIDTOKEN=401
}

//If auth fail then please login first ,as without it we do not have a token to verify , who is creating channel
export function authmiddleware(req:customRequest,res:Response,next:NextFunction){
try{
  const token = req.cookies.token;
  //we need to put a check here , kyuki agar token undefined hua toh app will crash, So to prevent that we need a check here .
  if (!token) {
  return res.status(401).json({
    message: "You are not logged in , Please log in to create channel"
  });
  }
  const {userId} = jwt.verify(token,process.env.SECRET_KEY as string)as TokenPayload;
  req.userId = userId;
  next();
}catch(error){
  console.log(error,"ERROR CAME OUT OF aUTH")
  res.status(ExtraInfo.INVALIDTOKEN).json({
   message:"Invalid token , token not exist"
  })
}
}