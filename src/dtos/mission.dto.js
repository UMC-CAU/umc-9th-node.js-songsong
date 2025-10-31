export const bodyToChallenge=(body, missionId)=>{
    return {
        userId:body.userId,
        missionId
    }
}

export const responseFromChallenge=(challenge)=>{
    
    return {
        success:true,
        code:"S201",
        message: "미션 도전이 시작되었습니다.",
        data:{
            id:challenge.id,
            missionId:challenge.mission_id,
            userId:challenge.user_id,
            status:challenge.status,
        }
    }
}