//dto함수는 bodyToReview, responseFromReview

export const bodyToReview=(body:Record<string, any>, missionId: number)=>{
    return {
        content:body.content,
        missionId,
        userId:body.userId,
    }
}

export const responseFromReview=(review:Record<string, any>)=>{
    console.log(review)
    return {
        ...review,
        id:Number(review.id)
    };
}