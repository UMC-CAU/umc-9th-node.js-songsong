import {prisma} from "../db.config.js"


// User 데이터 삽입
export const addUser = async (data:Record<string, any>) => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  if (user) {
    return null;
  }

  const created= await prisma.user.create({ data: data});
  return created.id;
};

// 사용자 정보 얻기
export const getUser = async (userId:Record<string, any>) => {
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  return user;
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId:number, foodCategoryId:number) => {
  await prisma.userFavorCategory.create({
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId:number) => {
  const preferences = await prisma.userFavorCategory.findMany({
    select: {
      id: true,
      userId: true,
      foodCategoryId: true,
      foodCategory: true,
    },
    where: { userId: userId },
    orderBy: { foodCategoryId: "asc" },
  });

  return preferences;
};

export const getMissionStatusIdByUserId = async(userId:number)=>{
  const missionStatusIds = await prisma.missionStatus.findMany({
    select:{
      id: true,
    },
    where:{
      userId:BigInt(userId)
    }
  })
  return missionStatusIds.map(ms => ms.id);
}
export const getUserReviews = async(missionStatusIds:bigint[], cursor:number)=> {
  console.log(missionStatusIds)
  const reviews = await prisma.review.findMany({
    where:{
      missionStatusId:{
        in: missionStatusIds,
      },
      id:{gt:cursor}
    },
    orderBy:{id:"asc"},
    take:5
  }
  )
  
  const serialized = reviews.map((r)=>({
    ...r,
    id:Number(r.id),
    missionStatusId: Number(r.id),
  }))
    
  return serialized
}