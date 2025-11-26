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
export const getUser = async (userId:number) => {
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

export const updateUserInfo = async(data:Record<string, any>, userId:number)=>{
  console.log("레포지토리 레이어의 updateUserInfo에 도달했습니다.");
  console.log("수정할 유저 ID(레포지토리 레이어):", userId);
  console.log("수정할 데이터(레포지토리 레이어):", data);

  try{
    console.log("유저 정보 업데이트를 시작합니다.");
  const updatedUser = await prisma.user.update({
    where:{id: BigInt(userId)},
    data:{
      email: data.email,
      name: data.name,
      gender: data.gender,
      birth: data.birth,
      address: data.address,
      detailAddress: data.detailAddress,
      phoneNumber: data.phoneNumber,
  }})

  const serialized = {
    ...updatedUser,
    id: Number(updatedUser.id),
  }
  return serialized;
} 
  
  catch (error) {
    console.error("유저 정보 업데이트 중 오류 발생:", error);
    throw error;
  }
};