import {prisma} from "../db.config.js"

//유저가 특정 미션에 새로 도전할 때 mission_status 테이블에 레코드 추가
export const addChallenge = async (data:Record<string, any>) => {
  const result = await prisma.missionStatus.create({
      data:{
        status: data.status,
        missionId: data.missionId,
        userId: data.userId
      },
  })

  return result.id
};


//방금 생성된 mission_status 행을 조회해서 반환

export const getChallenge = async (challengeId:number) => {
  const result = await prisma.missionStatus.findFirst({
    select : {
      id: true,
      missionId: true,
      userId: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
    where:{ id : challengeId},
  })
  
  return result
};


//특정 유저가 이미 해당 미션에 도전 중인지 확인
export const checkChallengeStatus = async (data:Record<string, any>) => {
  console.log(`data:${data}`)
  const result = await prisma.missionStatus.findFirst({
    select:{
      id: true,
      status: true,
    },
    where:{
      missionId: data.missionId,
      userId: data.userId,
    },
  })
  return result||null
};

export const getMissionsByRestaurantId = async(id:number, cursor:number)=>{
  const missions = await prisma.mission.findMany({
    where:{
      restaurantId : id,
      id:{gt:cursor}
    },
    orderBy:{id:"asc"},
    take:5
  })

  const serialized = missions.map((m)=>({
    ...m,
    id: Number(m.id),
    restaurantId: Number(m.restaurantId),
    score: Number(m.score)
  }))

  return serialized

}

export const alterMissionStatus = async(userId:number, missionId:number, changedStatus:Record<string, any>)=>{
  await prisma.missionStatus.updateMany({
    where:{
      userId:BigInt(userId),
      missionId:BigInt(missionId)
    },
    data:{
      status:changedStatus.status as any
    }
  })
}

export const getMission = async(userId:number, missionId:number)=>{
  const result = await prisma.missionStatus.findFirst({
    where:{
      userId:BigInt(userId),
      missionId:BigInt(missionId)
    },
  })
  if(result!=null){
  const serialized = {
    ...result,
    userId: Number(result.userId),
    missionId: Number(result.missionId),
    id: Number(result.id)

  }
  return serialized}

  return null
}
