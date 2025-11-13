//dto함수는 bodyToReview, responseFromReview
//repository함수로는 입력받은 데이터를 리뷰 테이블에 넣는 addReview(id리턴), 리뷰 정보를 가져오는 getReview, missionStatusId에 대한 missionId를 찾는 getMissionId

import {bodyToReview, responseFromReview} from "../dtos/review.dto.js"
import { addReview, getReview, getMissionStatusId} from "../repositories/review.repository.js"
import {checkChallengeStatus} from "../repositories/mission.repository.js"
import { HasNotFinishedMissionError, HasNotJoinedMissionError } from "../errors.js"

export const createReview = async (data) => {
    console.log("서비스 진입")
    
    const missionStatusId=await getMissionStatusId({
        userId : data.userId,
        missionId : data.missionId
    })
    if(!missionStatusId){
        throw new HasNotJoinedMissionError("해당 미션에 참여한 기록이 없습니다.", data) //HasNotJoinedMissionError
    }
    if (await checkChallengeStatus(missionStatusId)){
        const reviewId = await addReview({
            content : data.content,
            missionStatusId
        
    })
        const review=await getReview(reviewId)
        return responseFromReview(review)
    }
    else throw new HasNotFinishedMissionError("미션을 완수해야 리뷰를 작성할 수 있습니다.", data) //HasNotFinishedMissionError
}