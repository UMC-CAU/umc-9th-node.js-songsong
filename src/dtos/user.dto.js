export const bodyToUser = (body) => {
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
  };
};

export const responseFromUser = ({ user, preferences }) => {
  const u = user[0];

  return {
    success: true,
    code: "S200",
    message: "회원가입이 완료되었습니다.",
    data: {
      user: {
        id: u.id,
        email: u.email,
        name: u.name,
        gender: u.gender,
        birth: u.birth,
        address: u.address,
        detail_address: u.detail_address,
        phone_number: u.phone_number,
        created_at: u.created_at,
      },
      preferences: preferences.map((p) => ({
        id: p.id,
        food_id: p.food_id,
        name: p.name,
      })),
    },
  };
};
