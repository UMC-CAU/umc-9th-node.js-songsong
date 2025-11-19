export const bodyToChallenge=(body:Record<string, any>, missionId:number)=>{
    return {
        userId:body.userId,
        missionId
    }
}

export const responseFromChallenge=(challenge:Record<string, any>)=>{
    
    return challenge;
}

export const responseFromMissions=(missions:Record<string, any>)=>{
    return{
        missions,
        pagination:{
            cursor: missions.length? missions[missions.length-1].id : null
        }
    }
}

export const bodyToMissionStatus=(body:Record<string, any>)=>{
    return body;
    
}

export const responseFromChangedMission=(body:Record<string, any>)=>{
    return body
}