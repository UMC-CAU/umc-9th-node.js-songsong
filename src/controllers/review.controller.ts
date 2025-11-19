//createReview, bodyToReview구현 및 임포트 필요
import { StatusCodes } from "http-status-codes";
import {createReview} from "../services/review.service.js"
import {bodyToReview} from "../dtos/review.dto.js"
import type { Request, Response, NextFunction } from "express";


export const handleCreateReview = async(req: Request, res:Response, next:NextFunction)=>{
    /*
    #swagger.summary="리뷰 작성 요청 API";
    #swagger.requestBody={
        required:true,
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        content:{type:"string"},
                        userId:{type:"number"}
                    }
                }
            }
        }
    };

    #swagger.responses[200]={
        description:"리뷰 작성 성공 응답",
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        resultType:{type:"string", example:"SUCCESS"},
                        error:{type:"object", nullable:true, example:null},
                        success:{
                            type:"object",
                            properties:{
                                id :{type:"number"},
                                content:{type:"string"}
                            }
                        }
                    }
                }
            }
        }
    };

    #swagger.responses[400]={
        description:"리뷰 작성 실패 응답",
        content:{
      "application/json" : {
        schema: {
          type: "object",
          properties : {
            resultType:{type:"string", example:"FAIL"},
            error : {
              type: "object",
              properties:{
                errorCode:{type:"string", example:"RV001"},
                reason:{type:"string"},
                data:{type:"object"}
              }
            },
            success:{type:"object", nullable:true, example:null}
          }
        }
      }
    }
    }
    */
    console.log("리뷰 작성을 요청했습니다.");
    console.log("body:", req.body);

    const {missionId} = req.params;
    const reviewData = bodyToReview(req.body, Number(missionId));
    const review = await createReview(reviewData);
    (res as any).status(StatusCodes.OK).success(review);
}



