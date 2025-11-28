export const bodyToUser = (body:Record<string, any>) => {
  const birth = new Date(body.birth); //날짜 변환

  return {
    email: body.email, //필수 
    name: body.name, // 필수
    gender: body.gender, // 필수
    birth, // 필수
    address: body.address || "", //선택 
    detailAddress: body.detailAddress || "", //선택 
    phoneNumber: body.phoneNumber,//필수
    preferences: body.preferences,// 필수 
    password: body.password || "", //일단 비밀번호는 선택으로..
  };
};



export const responseFromUser = ({ user, preferences }:Record<string, any>) => {
  const preferFoods = preferences.map(
    (preference:Record<string, any>) => preference.foodCategory.name
  );

  return {
      ...user,
      id:Number(user.id),
      preferCategory: preferFoods,
  };
};

export const responseFromUserReviews=(reviews:Record<string, any>)=>{
  return{
    reviews,
    pagination:{
      cursor: reviews.length?reviews[reviews.length-1].id:null,
    },
  }
}

export const modifyBodyToUser = (body:Record<string, any>) => {
  console.log("modifyBodyToUser에 도달했습니다.");


  return {
    name: body.name || "",// 선택
    gender: body.gender || "", // 선택
    birth: body.birth ? new Date(body.birth) || "" : "", // 선택
    address: body.address || "", //선택 
    detailAddress: body.detailAddress || "", //선택 
    phoneNumber: body.phoneNumber || "",//선택
    preferences: body.preferences || "",// 선택 
    password: body.password || "", //일단 비밀번호는 선택으로..
  };
}
