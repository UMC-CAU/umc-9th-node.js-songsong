//dto함수는 bodyToReview, responseFromReview
//repository함수로는 입력받은 데이터를 리뷰 테이블에 넣는 addReview(id리턴), 리뷰 정보를 가져오는 getReview, missionStatusId에 대한 missionId를 찾는 getMissionId

import {bodyToReview, responseFromReview} from "../dtos/review.dto.js"
import {addReview, getReview, getMissionStatusId} from "../repositories/review.repository.js"


export const createReview = async (data) => {
    console.log("서비스 진입")
    
    const missionStatusId=await getMissionStatusId({
        userId : data.userId,
        missionId : data.missionId
    })
    if(!missionStatusId){
        throw new Error("해당 미션에 참여한 기록이 없습니다.")
    }
    const reviewId=await addReview({
        content : data.content,
        missionStatusId
    })
    
    if (!reviewId){
        throw new Error("리뷰 생성에 실패했습니다.")
    }
    //이제 addReview를 했으면.. 리뷰테이블에 미션이 들어가있게 된다.
    //그럼 이제 리턴값 반환

    const review = await getReview(reviewId)

    return responseFromReview(review)
}