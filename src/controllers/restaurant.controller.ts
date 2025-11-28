import { StatusCodes } from "http-status-codes";
import {bodyToRestaurant} from "../dtos/restaurant.dto.js";
import {createRestaurant, listRestaurantReviews, listRestaurantMissions} from "../services/restaurant.service.js";
import type { Request, Response, NextFunction } from "express";



export const handleCreateRestaurant=async(req:Request, res:Response, next:NextFunction)=>{
    /*
    #swagger.summary = "특정 지역에 가게 추가 API";
    #swagger.requestBody = {
    required : true,
    content : {
      "application/json" : {
        schema : {
          type : "object",
          properties : {
            name : {type : "string"},
          }
        }
      }
    }
   };

   #swagger.responses[200]={
    description: "특정 지역에 가게 추가 성공 응답",
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
                name: {type:"string"},
                districtId :{type:"number"},
                id: {type:"number"}
              }
            }
          }
        }
      }
    }
   };
   #swagger.responses[400]={
    description:"특정 지역에 가게 추가 실패 응답",
    content:{
      "application/json" : {
        schema: {
          type: "object",
          properties : {
            resultType:{type:"string", example:"FAIL"},
            error : {
              type: "object",
              properties:{
                errorCode:{type:"string", example:"RS001"},
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
    
    console.log("가게 추가를 요청했습니다.");
    console.log(req.body);

    const {districtId}=req.params;
    const restaurantData = bodyToRestaurant(req.body, Number(districtId));
    const review = await createRestaurant(restaurantData);
    (res as any).status(StatusCodes.OK).success(review);

}


/*
나같은 경우에는 1. 미션 테이블에서 가게id로 미션 id전부 조회->그 미션 id를 가진 mission_status테이블의 pk전부 조회->그 pk를 review테이블에서 전부 조회 해야 하네.
*/
export const handleListRestaurantReviews=async(req:Request, res:Response, next:NextFunction)=>{
     /*
  #swagger.summary = "가게별 리뷰 목록 조회 API";
  #swagger.responses[200] = {
    description: "가게별 리뷰 목록 조회 성공 응답",
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
                    content:{type:"string"}
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
    description:"가게별 리뷰 목록 조회 실패 응답",
    content:{
      "application/json":{
        schema:{
          type:"object",
          properties:{
            resultType:{type:"string", example:"FAIL"},
            error:{
              type:"object",
              properties:{
                errorCode:{type:"string", example:"M005"},
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
    console.log("가게에 추가된 리뷰 목록 조회를 요청했습니다.");

    const reviews = await listRestaurantReviews( 
        Number(req.params.restaurantId),
        typeof req.query.cursor === "string"? Number(req.query.cursor) : 0    
    );
    (res as any).status(StatusCodes.OK).success(reviews);
}

export const handleListRestaurantMissions=async(req:Request, res:Response, next:any)=>{
/*
  #swagger.summary = "레스토랑별 미션 조회 API";
  #swagger.responses[200] = {
    description: "레스토랑별 미션 조회 성공 응답",
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
                    restaurantId: {type:"number"},
                    score: {type:"number"},
                    content: {type:"string"},
                    createdAt: {type:"string", format:"date"},
                    updatedAt: {type:"string", format:"date"},
                    expireAt: {type:"string", format:"date"}
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
    description:"레스토랑별 미션 조회 실패 응답",
    content:{
      "application/json":{
        schema:{
          type:"object",
          properties:{
            resultType:{type:"string", example:"FAIL"},
            error:{
              type:"object",
              properties:{
                errorCode:{type:"string", example:"M005"},
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
    
    console.log("가게의 모든 미션 목록 조회를 요청했습니다.");

    const missions = await listRestaurantMissions(
        Number(req.params.restaurantId),
        typeof req.query.cursor === "string"? Number(req.query.cursor) : 0
    );
    (res as any).status(StatusCodes.OK).success(missions);

}