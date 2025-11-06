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
