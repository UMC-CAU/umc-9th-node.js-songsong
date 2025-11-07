import { StatusCodes } from "http-status-codes";
import {bodyToRestaurant} from "../dtos/restaurant.dto.js"
import {createRestaurant, listRestaurantReviews, listRestaurantMissions} from "../services/restaurant.service.js"
import type { Request, Response } from "express";


export const handleCreateRestaurant=async(req:Request, res:Response, next:any)=>{
    console.log("가게 추가를 요청했습니다.")
    console.log(req.body)

    const {districtId}=req.params
    const restaurantData = bodyToRestaurant(req.body, districtId)
    const review = await createRestaurant(restaurantData)
    res.status(StatusCodes.OK).json({result:review})

}


/*
나같은 경우에는 1. 미션 테이블에서 가게id로 미션 id전부 조회->그 미션 id를 가진 mission_status테이블의 pk전부 조회->그 pk를 review테이블에서 전부 조회 해야 하네.
*/
export const handleListRestaurantReviews=async(req:Request, res:Response, next:any)=>{
    console.log("가게에 추가된 리뷰 목록 조회를 요청했습니다.")

    const reviews = await listRestaurantReviews( 
        Number(req.params.restaurantId),
        typeof req.query.cursor === "string"? Number(req.query.cursor) : 0    
    )
    res.status(StatusCodes.OK).json({result:reviews})
}

export const handleListRestaurantMissions=async(req:Request, res:Response, next:any)=>{
    console.log("가게의 모든 미션 목록 조회를 요청했습니다.")

    const missions = await listRestaurantMissions(
        Number(req.params.restaurantId),
        typeof req.query.cursor === "string"? Number(req.query.cursor) : 0
    )
    res.status(StatusCodes.OK).json({result:missions})

}