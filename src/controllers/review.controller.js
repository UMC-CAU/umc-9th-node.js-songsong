//createReview, bodyToReview구현 및 임포트 필요
import { StatusCodes } from "http-status-codes";
import {createReview} from "../services/review.service.js"
import {bodyToReview} from "../dtos/review.dto.js"

export const handleCreateReview = async(req, res, next)=>{
    console.log("리뷰 작성을 요청했습니다.")
    console.log("body:", req.body)

    const {missionId} = req.params
    const reviewData = bodyToReview(req.body, missionId)
    const review = await createReview(reviewData)
    res.status(StatusCodes.OK).json({result:review})
}

