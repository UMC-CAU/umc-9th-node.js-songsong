//dto함수는 bodyToReview, responseFromReview

export const bodyToReview=(body, missionId)=>{
    return {
        content:body.content,
        missionId,
        userId:body.userId,
    }
}

export const responseFromReview=(review)=>{
    return{
        success:true,
        code:"S200",
        message: "리뷰 작성이 완료되었습니다",
        data:{
            id:review.id,
            content:review.content,
            missionStatusId:review.missionStatusId
        }
    }
}