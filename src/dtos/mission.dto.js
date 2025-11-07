export const bodyToChallenge=(body, missionId)=>{
    return {
        userId:body.userId,
        missionId
    }
}

export const responseFromChallenge=(challenge)=>{
    
    return {
        success:true,
        code:"S200",
        message: "미션 도전이 시작되었습니다.",
        data:{
            id:challenge.id,
            missionId:challenge.mission_id,
            userId:challenge.user_id,
            status:challenge.status,
        }
    }
}

export const responseFromMissions=(missions)=>{
    return{
        success:true,
        code:"S200",
        data:missions,
        pagination:{
            cursor: missions.length? missions[missions.length-1].id : null
        }
    }
}

export const bodyToMissionStatus=(body)=>{
    return{
        status:body.status
    }
}

export const responseFromChangedMission=(body)=>{
    return{
        success:true,
        code:"S200",
        data: body
    }
}