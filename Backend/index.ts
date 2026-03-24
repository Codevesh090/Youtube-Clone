import {prisma} from "./db.ts";
import express from "express";
import { SignupSchema, SigninSchema, uploadVideo, createChannel} from "./types.ts";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import cors from 'cors'
import cookieParser from "cookie-parser"
import { success } from "zod";
import { error } from "node:console";
import {S3Client , GetObjectCommand , PutObjectCommand, Bucket$ } from '@aws-sdk/client-s3';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'
import { authmiddleware } from "./authMiddleware.ts";
import {type Request , type Response , type NextFunction} from 'express'
import { Type } from "./generated/prisma/enums";
import axios from "axios";


const app = express();
const PORT = process.env.PORT
app.use(express.json());
app.use(cookieParser());
  
//Cors kya karta hai , ki like backend port 3001 par chal raha hai and frontend 3000 port par and when we make a request from frontend like using fetch or axios , toh wo bola jaayega ki port 3000 par port 5173 se request aayi hai . Now agar hum cors nahi lagate hai , toh koi bhi frontend hamare backend par request maar paayega aaram se but if we use cors then hum us time par bol rahe hote hai ki koi bhi frontend yaa port is backend par request nahi maar sakta hai sirf origin:"http://localhost:5173" ki hi request accept hogi , sirf wahi request maar sakta hai .
//Cors ko three steps me use karte hai 
//pehle npm i cors 
//then import it and using app.use use it 
//and also when you make request through frontend toh waha bhi request me credentials=include karke bhejna hota hai .

app.use(
  cors({
    origin:"http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


enum ExtraInfo {
  WRONGINPUT = 400,
  USERDOESNOTEXISTS = 404,
  SUCCESS = 200,
  SERVERSIDEPROBLEM = 500,
  USERALREADYEXIST = 409,
  UNAUTHORIZED = 401
}


const R2_URL = "https://e21220f4758c0870ba9c388712d42ef2.r2.cloudflarestorage.com";
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_ACCESS_SECRET = process.env.R2_ACCESS_SECRET!;
//Humne Credentials setup kar liye 

const S3 = new S3Client({
  region:"auto",
  endpoint:R2_URL,  
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_ACCESS_SECRET,
  }
});
//Humne S3 client setup kar liya 

//is jagah yeh video upload karna chahta hu
app.post("/getPresignedUrl",async(req,res)=>{
  //here we can write the conditions , jo ki agar fullfill hogi tabhi presigned url banega else not 
  
  
  try{
  const videoPath = `videos/devesh/Videos/${Date.now()}-${Math.random()}.mp4`;

  const putUrl = await getSignedUrl(
   S3,

   new PutObjectCommand ({
   Bucket: "youtube-100xdevs",
   Key: videoPath,
   ContentType: "video/mp4",
   }) ,

   { expiresIn: 60 * 5 }
  )
  
  const finalVedioUrl = "https://pub-9ed79a211b484b3f819c6f0883e7ac3e.r2.dev/"+videoPath;
  
  res.status(ExtraInfo.SUCCESS).json({
  putUrl,
  finalVedioUrl
  })
 }catch(e){
  res.status(ExtraInfo.SERVERSIDEPROBLEM).json({
    message:"Failed to generate Video Presigned Url"
  })
 }

})



app.post("/getThumbnailPresignedUrl",async(req,res)=>{
  try{
    const {fileType} = req.body; //fileType gives has either this image/png or image/jpeg
    const extension = fileType.split("/")[1]; //It means we split on basis of "/" like [image,png] and then takes the index 1 wala part
    
    const imagePath = `videos/devesh/Images/${Date.now()}-${Math.random()}.${extension}` //we used extension here becaause our images are of either type png or jpeg not a single type , so according to its type it changes.


    const putUrl = await getSignedUrl(
      S3,
      new PutObjectCommand({
       Bucket: "youtube-100xdevs",
       Key: imagePath,
       ContentType:fileType,
      }),
      {expiresIn:60*5}
    )


    res.status(ExtraInfo.SUCCESS).json({
      putUrl,
      finalImageUrl:"https://pub-9ed79a211b484b3f819c6f0883e7ac3e.r2.dev/"+imagePath
    })
 }catch(e){
  res.status(ExtraInfo.SERVERSIDEPROBLEM).json({
    message:"Failed to generate Thumbnail Presigned Url"
  })
 }

})



//get the permission of the backend for channel banner upload
app.post("/getBannerPresignedUrl",async(req,res)=>{
 try{
  const {fileType} = req.body;
  const extension = fileType.split("/")[1];
  const bannerPath = `videos/devesh/ChannelBanners/${Date.now()}-${Math.random()}.${extension}`
  
  const putUrl = await getSignedUrl(
    S3,
    new PutObjectCommand({
      Bucket:"youtube-100xdevs",
      Key:bannerPath,
      ContentType:fileType
    }),
    {expiresIn:60*5}
  )

  const finalUrl = "https://pub-9ed79a211b484b3f819c6f0883e7ac3e.r2.dev/"+bannerPath;

  res.status(ExtraInfo.SUCCESS).json({
    putUrl,
    finalUrl
  })
}catch(e){
 res.status(ExtraInfo.SERVERSIDEPROBLEM).json({
   message:"Failed to generate Banner Presigned Url"
 })
}
})



// get the permission from the backend to upload Channel Icon on cloud or R2 bucket
app.post("/getchannelIconPresignedUrl",async(req,res)=>{
 try{
  const {fileType} = req.body;
  const extension = fileType.split("/")[1];
  const channelIconPath = `videos/devesh/ChannelIcons/${Date.now()}-${Math.random()}.${extension}` 

  const putUrl = await getSignedUrl(
    S3,
    new PutObjectCommand ({
      Bucket:"youtube-100xdevs",
      Key:channelIconPath,
      ContentType:fileType
    }),
    {expiresIn:60*5}
  )

  const channelIconfinalUrl = "https://pub-9ed79a211b484b3f819c6f0883e7ac3e.r2.dev/"+channelIconPath;

  res.status(ExtraInfo.SUCCESS).json({
    putUrl,
    channelIconfinalUrl
  })
 }catch(e){
  res.status(ExtraInfo.SERVERSIDEPROBLEM).json({
    message:"Failed to generate Channel Icon Presigned Url"
  })
 }
})



//signup
app.post("/signup",async(req,res)=>{
 try{
  const {success , data } = SignupSchema.safeParse(req.body);
  if(!success){
  return res.status(ExtraInfo.WRONGINPUT).json({
    success:false,
    message : "Your input is invalid,please try again"
  })
  }

  const userExist = await prisma.users.findUnique({
    where:{
      email:data.email
    }
  })
  if(userExist){
  return res.status(ExtraInfo.USERALREADYEXIST).json({
  success:false,
  message : "User already exist , Please Sign in"
  })
  }

  const hashedPassword = await bcrypt.hash(data.password,5);

  const UserInfo = await prisma.users.create({
    data :{
      email : data.email,
      password :hashedPassword,
      firstName : data.firstName,
      lastName : data.lastName,
      gender : data.gender,
      dateOfBirth : data.dateOfBirth
    }
  })

  res.status(ExtraInfo.SUCCESS).json({
    success:true,
    message : "Signup successful",
    data : data
  })
 }catch(e){
  res.status(ExtraInfo.SERVERSIDEPROBLEM).json({
    success:false,
    message : "Signup failed",
  })
 }

})




//signin
app.post("/signin" , async(req,res)=>{
 try {
 const {success,data} = SigninSchema.safeParse(req.body);
 if(!success){
  return res.status(ExtraInfo.WRONGINPUT).json({
    success:false,
    message:"Your input is invalid,please try again"
  })
 }

 const userExist = await prisma.users.findUnique({
    where:{
      email:data.email
    }
  })

  if(!userExist){
    return res.status(ExtraInfo.USERDOESNOTEXISTS).json({
      success:false,
      message:"User does not exist please Sign up"
    })
  }

  const checkPassword = await bcrypt.compare(data.password,userExist.password);
  if(!checkPassword){
    return res.status(ExtraInfo.WRONGINPUT).json({
      success:false,
      message:"Wrong Password, please try again"
    })
  }
  
  const AUTH_KEY = process.env.SECRET_KEY as string;
  if(!process.env.SECRET_KEY){
    throw new Error("SECRET_KEY as not defined")
  }

  const token = jwt.sign({
    userId : userExist.id,
  },AUTH_KEY)
 
  res.cookie("token",token,{
    maxAge: 1 * 24 * 60 * 60 * 1000,//matlab 1 day rahegi in ms . 1 din baad it will expire
    httpOnly : true,
    secure:false //Since localhost is not https , hence we set its value as "false" , but in production its "true" as then we use https 
  })
  //cookie me key add karenge key 

  res.status(ExtraInfo.SUCCESS).json({
    message : "Signin successful",
    success:true,
    token :token
  })

 }catch(e){
 return res.status(ExtraInfo.SERVERSIDEPROBLEM).json({
  success:false,
  message:"Server Side Problem 102"
 })
 }
})


interface customRequest extends Request {
  userId?: string;
}


//upload the video
app.post("/uploadVideo",authmiddleware,async(req:customRequest,res)=>{
  try{
   const {success,data,error} = uploadVideo.safeParse(req.body);
   if(!success){
    return res.status(ExtraInfo.WRONGINPUT).json({
    success:false,
    message : "Your input is invalid,please try again",
    error:error
   })
   }

   if (!req.userId) {
   return res.status(ExtraInfo.UNAUTHORIZED).json({ message: "Unauthorized" });
   }
   // 💡 isko humne isliye likha kyuki humne userid ko ? lagakar iski type string ya undefined kar di thi but in prisma humne userId ki type sirf String rakhi hai , toh isiliye subse pehle hum check kar lete hai ki userId ki type undefined toh nahi hai if yes then do not proceed if No then proceed .
   
   const VideoInfo = await prisma.uploads.create({
    data:{
      vedioUrl:data.vedioUrl,
      thumbnailUrl:data.thumbnailUrl,
      description:data.description,
      title:data.title,
      type:data.type,
      userId:req.userId
    }
   })

   res.status(ExtraInfo.SUCCESS).json({
    success:true,
    message : "Video uploaded Successfully",
    data : VideoInfo
  })
}catch(e){
  console.error(e);
  res.status(ExtraInfo.SERVERSIDEPROBLEM).json({
    success:false,
    message :"Upload failed",
  })
 }

})
//upload the video


//create your channel and putting the channel details on db 
app.post("/createChannel",authmiddleware,async(req:customRequest,res)=>{
 try{
 const {success,data,error} = createChannel.safeParse(req.body);
 if(!success){
  return res.status(ExtraInfo.WRONGINPUT).json({
    success:false,
    message:"Your input is invalid , please try again",
    error:error
  })
 }
 
 if(!req.userId){
  return res.status(ExtraInfo.UNAUTHORIZED).json({message:"Unauthorized"})
 }

 //agar jo hume userId mil rahi hai usse user hi exist nahi kar raha hai ,Tab toh process will crash , So,we applied a check which check does a user exist with this user Id and then only we moved on to other step
 const existingUser = await prisma.users.findUnique({
  where: { id: req.userId }
 });

if (!existingUser) {
  return res.status(ExtraInfo.USERDOESNOTEXISTS).json({
    success: false,
    message: "User not found"
  });
}

//humne ek aur check lagaya hai , ki check kar lo kahi is user ka channel name already exist toh nahi karta hai , If there is some value in channel name then user ko new cahnnel mat banane do as each user has only one channel allowed .
if (existingUser.channelName) {
  return res.status(400).json({
    success: false,
    message: "Channel already exists,You cannot create one more"
  });
}


 const channelInfo = await prisma.users.update({
  where:{id:req.userId},
  data:{
    channel:data.channel,
    channelName:data.channelName,
    description:data.description,
    bannerUrl:data.bannerUrl,
    profilePicture:data.profilePicture
  }
 })

 res.status(ExtraInfo.SUCCESS).json({
  success:true,
  message:"Channel Created Successfully",
  data:channelInfo
 })
}catch(e){
console.error(e);
  res.status(ExtraInfo.SERVERSIDEPROBLEM).json({
    success:false,
    message :"Channel creation failed",
  })
}

})


//get all vedios
app.get("/getAllVedios",async(req,res)=>{
  try{
    const allVedios = await prisma.uploads.findMany({ //.findMany kya karega ki uploads table ki sabhi entries ko le aayega if we did not give it anything like userId jiske basis par wo lekar aaye
    include : {userid : {select:{id:true, channelName:true , profilePicture:true , channel:true}}}, //Yaha hum bol rahe hai ki "uploads" ki sabhi vedio toh laana hi but with that take the corresponding user info jitna manga hai like here we asked for id , channelName , profilePicture and also yeh kya karta hai ki internally db JOINS karta hai .
    orderBy :{createdAt:"desc"}, //it is user to sort the data we get on the basis of a condition like here the condition is createdAt:desc and desc means descending order
    where:{
      type:Type.Public
    }
  })

  //Question? -> maine toh nahi bataya ki users table se lao, phir kaise pata chala?
  //Answer -> Prisma ko already pata hota hai ki uploads aur users ka relation kya hai — because tumne ye relation schema.prisma file me define kiya hota hai.
  // include : {userid  -> yaha jo userid likha hai wo randomly kuch nahi hai , yeh wo naam hota hai jisse connection bana hai do tables ke beech like -> userid Users @relation(fields: [userId],references: [id]) userid ne uploads table se connection banaya hai .
  res.status(ExtraInfo.SUCCESS).json({
    success:true,
    data : allVedios
  })

  }catch(e){
    res.status(ExtraInfo.SERVERSIDEPROBLEM).json({
    success:false,
    message : "Something went wrong on server side"
  })
  }
  
})


app.get("/getChannelStatus",authmiddleware,async(req:customRequest,res)=>{
 try{const channelStatus = await prisma.users.findUnique({
  where:{
    id:req.userId
  },
  select:{
    channel:true,
  }
 })

 res.status(ExtraInfo.SUCCESS).json({
  success:true,
  channelStatus:channelStatus
 })}
 catch(e){
  res.status(ExtraInfo.SERVERSIDEPROBLEM).json({
    success:false,
    message:"Something went wrong on server side"
  })
 }
})

app.get("/getchannelInfo",authmiddleware,async(req:customRequest,res)=>{
  try{
    const channelInfo = await prisma.users.findUnique({
    where:{
      id:req.userId
    },
    select:{
      id:true,
      channelName:true,
      bannerUrl:true,
      profilePicture:true,
      description:true,
      subscriberCount:true,
      uploads:{
       select: {
         uploadId:true,
         thumbnailUrl: true,
         title: true,
         views: true,
         createdAt: true
      }
    }
    }
  })
  res.status(ExtraInfo.SUCCESS).json({
    success:true,
    channelInfo:channelInfo
  })}
  catch(error:unknown){
   res.status(ExtraInfo.SERVERSIDEPROBLEM).json({
    success:false,
    message:"Server Side error happended"
   })
  }
})

app.get("/getothersChannelInfo/:userId",async(req,res)=>{
  try{ const userId = req.params.userId;
   const othersChannelInfo = await prisma.users.findUnique({
    where:{
      id:userId
    },select:{
      id:true,
      channelName:true,
      bannerUrl:true,
      profilePicture:true,
      description:true,
      subscriberCount:true,
    }
   })
   res.status(ExtraInfo.SUCCESS).json({
    success:true,
    othersChannelInfo:othersChannelInfo
   })}catch{
    res.status(ExtraInfo.SERVERSIDEPROBLEM).json({
      success:false,
      message:"Server Side Error Occured"
    })
   }
})

app.get("/getOthersChannelVideos/:userId",async(req,res)=>{
     try{const userId = req.params.userId;
     const othersChannelVideosInfo = await prisma.uploads.findMany({
      where:{
        userId:userId
      },select:{
        uploadId:true,
        thumbnailUrl: true,
        title: true,
        views: true,
        createdAt: true
      }
     });
     res.status(ExtraInfo.SUCCESS).json({
      success:true,
      othersChannelVideosInfo:othersChannelVideosInfo
     })}catch{
      res.status(ExtraInfo.SERVERSIDEPROBLEM).json({
        success:false,
        message:"Server side Error Occured"
      })
     }

   })

app.listen(PORT,()=>{
  console.log(`Server is running at ${PORT}`)
})



//Extra Info --
 //	•	PUT = Put everything | Yanni yeh pure row ko replace kar dega toh purana data out and new In.
 // •	PATCH = Patch (fix small part) | Yeh sirf jitna part update karne ko keh rahe hai utna hi karega.
 //So because agar hume thoda sa hi update karna hai na ki puri ro replace , hence then we use patch.

