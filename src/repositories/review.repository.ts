//함수 이름	역할
//getMissionStatusId({ userId, missionId })	mission_status 테이블에서 id 찾기
//addReview({ content, missionStatusId })	review 테이블에 insert
//getReview(reviewId)	review 테이블에서 row 조회

import { pool } from "../db.config.js";
import {prisma} from "../db.config.js"


export const getMissionStatusId = async (data:Record<string, any>) => {
  console.log(data)

  const result = await prisma.missionStatus.findFirst({
    select:{
      id: true,
      missionId: true,
      userId: true,
    },
    where:{
      missionId: BigInt(data.missionId),
      userId: BigInt(data.userId),
    }
  })
    // 결과가 없으면 null 반환
    if (result == null) {
      return null;
    }
    return result.id
};

export const isMissionStatusSuccess = async(missionStatus:string)=>{
  const result = await prisma.missionStatus.findFirst({
    select:{
      status:true,
    }
  })
  if (result==null) {
    return false}
  else if(result.status=="ON_GOING"){
    return false
  }
  else return true
}

export const addReview = async (data:Record<string, any>) => {
  console.log(data)
  
  const result = await prisma.review.create({
    data:{
      content: data.content,
      missionStatusId: BigInt(data.missionStatusId),
    },
  })
  console.log(result)
  return result.id
};

export const getReview = async (reviewId:number) => {
  const result = await prisma.review.findFirst({
    select:{
      id: true,
      content: true,
      missionStatus: true,
    },
    where:{id: BigInt(reviewId)},
  })
    if (result==null) {
      return null; // 존재하지 않는 리뷰
    }
  const serialized = {
    ...result,
    id: Number(result.id), // BigInt → number
  };

  return serialized;

};