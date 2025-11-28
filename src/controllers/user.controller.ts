import { StatusCodes } from "http-status-codes";
import { bodyToUser, modifyBodyToUser } from "../dtos/user.dto.js";
import { userSignUp, listUserReviews, modifyUserInfo } from "../services/user.service.js";
import type {Response, Request, NextFunction} from "express";

export const handleUserSignUp = async (req:Request, res:Response, next:NextFunction) => {
  /*
   #swagger.summary = "회원 가입 API";
   #swagger.requestBody = {
    required : true,
    content : {
      "application/json" : {
        schema : {
          type : "object",
          properties : {
            email : {type : "string"},
            name : {type : "string"},
            gender : {type : "string"},
            birth : {type: "string", format: "date"},
            address : {type: "string"},
            detailAdress : {type:"string"},
            phoneNumber : {type: "string"},
            preferences : {type: "object", items:{type:"number"}}
          }
        }
      }
    }
   };

   #swagger.responses[200]={
    description: "회원 가입 성공 응답",
    content : {
      "application/json":{
        schema: {
          type : "object",
          properties:{
            resultType:{ type:"string", example: "SUCCESS"},
            error:{type:"object", nullable:true, example:null},
            success:{
              type:"object",
              properties:{
                id: {type:"number"},
                email : {type : "string"},
                name : {type : "string"},
                gender : {type : "string"},
                birth : {type: "string", format: "date"},
                address : {type: "string"},
                detailAdress : {type:"string"},
                phoneNumber : {type: "string"},
                preferences : {type: "object", items:{type:"number"}}
              }
            }
          }
        }
      }
    }
   };
   #swagger.responses[400]={
    description:"회원 가입 실패 응답",
    content:{
      "application/json" : {
        schema: {
          type: "object",
          properties : {
            resultType:{type:"string", example:"FAIL"},
            error : {
              type: "object",
              properties:{
                errorCode:{type:"string", example:"U001"},
                reason:{type:"string"},
                data:{type:"object"}
              }
            },
            success:{type:"object", nullable:true, example:null}
          }
        }
      }
    }
   };
  */
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));
  (res as any).status(StatusCodes.OK).success(user);
};

export const handleListUserReviews = async(req:Request, res:Response, next:NextFunction)=>{
  /*
  #swagger.summary = "리뷰 목록 조회 API";
  #swagger.responses[200] = {
    description: "유저별 리뷰 목록 조회 성공 응답",
    content:{
      "application/json":{
        schema:{
          type:"object",
          properties:{
            resultType:{ type:"string", example: "SUCCESS"},
            error:{type:"object", nullable:true, example:null},
            success:{
              type:"object",
              properties:{
                data:{
                  type: "array",
                  items:{
                    id: {type:"number"},
                    createdAt:{type:"string", format:"date"},
                    updatedAt:{type:"string", format:"date"},
                    content:{type:"string"},
                    missionStatusId:{type:"number"}
                  }
                }
              }
            }
          },
          pagination:{type:"object", properties:{cursor:{type:"number", nullable:true}}}
        }
      }
    }
  };

  #swagger.responses[400]={
    description:"유저별 리뷰 목록 조회 실패 응답",
    content:{
      "application/json":{
        schema:{
          type:"object",
          properties:{
            resultType:{type:"string", example:"FAIL"},
            error:{
              type:"object",
              properties:{
                errorCode:{type:"string", example:"M002"},
                reason:{type:"string"},
                data:{type:"object"}
              }
            },
            success:{type:"object", nullable:true, example:null}
          }
        }
      }
    }
  };
  */  
  
  console.log("리뷰 목록 조회를 요청했습니다.");

    const {userId} = req.params;
    const reviews = await listUserReviews(
      Number(userId), 
      typeof req.query.cursor === "string"? Number(req.query.cursor) : 0 
    );
    (res as any).status(StatusCodes.OK).success(reviews);
      
}



export const handleModifyUserInfo = async(req:Record<string, any>, res:Response, next:NextFunction)=>{
  console.log("유저 정보 수정을 요청했습니다.");
  if (!req.user) {
   return next(new Error("userId가 없습니다."));
  }

  else{

    const userId = req.user.id;
    console.log("수정할 유저 ID:", userId);
    const updatedInfo = await modifyUserInfo(modifyBodyToUser(req.body), userId);

    (res as any).status(StatusCodes.OK).success(updatedInfo);
  }
}
