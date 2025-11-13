//createReview, bodyToReview구현 및 임포트 필요
import { StatusCodes } from "http-status-codes";
import {createReview} from "../services/review.service.js"
import {bodyToReview} from "../dtos/review.dto.js"
import type { Request, Response, NextFunction } from "express";


export const handleCreateReview = async(req: Request, res:Response, next:NextFunction)=>{
    console.log("리뷰 작성을 요청했습니다.");
    console.log("body:", req.body);

    const {missionId} = req.params;
    const reviewData = bodyToReview(req.body, Number(missionId));
    const review = await createReview(reviewData);
    (res as any).status(StatusCodes.OK).success(review);
}



