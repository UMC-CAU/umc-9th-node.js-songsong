import { StatusCodes } from "http-status-codes";
import {bodyToChallenge, bodyToMissionStatus} from "../dtos/mission.dto.js";
import {createChallenge, changeMissionStatus} from "../services/mission.service.js";
import type { Request, Response, NextFunction } from "express";


export const handleCreateChallenge = async(req:Request, res:Response, next:NextFunction)=>{
/*
   #swagger.summary = "미션 도전 API";
   #swagger.requestBody = {
    required : true,
    content : {
      "application/json" : {
        schema : {
          type : "object",
          properties : {
            userId:{type:"number"}
          }
        }
      }
    }
   };

   #swagger.responses[200]={
    description: "미션 도전 성공 응답",
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
                createdAt: {type: "string", format: "date"},
                updatedAt: {type: "string", format: "date"},
                status: {type:"string"},
                missionId: {type:"number"},
                userId :{type:"number"}
              }
            }
          }
        }
      }
    }
   };
   #swagger.responses[400]={
    description:"미션 도전 실패 응답",
    content:{
      "application/json" : {
        schema: {
          type: "object",
          properties : {
            resultType:{type:"string", example:"FAIL"},
            error : {
              type: "object",
              properties:{
                errorCode:{type:"string", example:"M001"},
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
    
    console.log("미션 도전을 요청했습니다.");
    console.log("body:", req.body);
    const {missionId} = req.params;
    const missionData = bodyToChallenge(req.body, Number(missionId));
    const mission = await createChallenge(missionData);
    (res as any).status(StatusCodes.OK).success(mission);

}

export const handleChangeMissionStatus = async(req:Request, res:Response, next:NextFunction)=>{
/*
   #swagger.summary = "미션 성공으로 수정 API";
   #swagger.requestBody = {
    required : true,
    content : {
      "application/json" : {
        schema : {
          type : "object",
          properties : {
            status:{type:"string", example:"SUCCESS"}
          }
        }
      }
    }
   };

   #swagger.responses[200]={
    description: "미션 성공으로 수정 성공 응답",
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
                userId: {type:"number"},
                missionId: {type:"number"},
                id: {type:"number"},
                status: {type:"string", example:"SUCCESS"},
                createdAt: {type: "string", format: "date"},
                updatedAt: {type: "string", format: "date"}
            }
          }
        }
      }
    }
   };
   #swagger.responses[400]={
    description:"미션 성공으로 수정 실패 응답",
    content:{
      "application/json" : {
        schema: {
          type: "object",
          properties : {
            resultType:{type:"string", example:"FAIL"},
            error : {
              type: "object",
              properties:{
                errorCode:{type:"string", example:"M001"},
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
    
    console.log("진행 중 미션을 진행 완료로 수정하기를 요청했습니다.");
    console.log("body:", req.body);
    const {userId, missionId} = req.params;
    console.log(userId);
    console.log(missionId);
    const changedStatus = bodyToMissionStatus(req.body);
    const result = await changeMissionStatus(userId, missionId, changedStatus);
    (res as any).status(StatusCodes.OK).success(result);
}