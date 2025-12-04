import { responseFromUser, responseFromUserReviews, modifyBodyToUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  getMissionStatusIdByUserId,
  getUserReviews,
  updateUserInfo
} from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import {DuplicateUserEmailError, ReviewNotExistError} from "../errors.js"

export const userSignUp = async (data:Record<string, any>) => {

  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
    password: await bcrypt.hash(data.password, 7),
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preference of data.preferences) {
    await setPreference(Number(joinUserId), preference);
  }

  const user = await getUser(Number(joinUserId));
  const preferences = await getUserPreferencesByUserId(Number(joinUserId));

  return responseFromUser({ user, preferences });
};

export const listUserReviews = async(userId:number, cursor:number)=>{
  const reviews = await getUserReviews(await getMissionStatusIdByUserId(userId), cursor)
  if(reviews.length==0){
    throw new ReviewNotExistError("해당 유저가 작성한 리뷰가 없습니다.", {userId:userId})
  }

  return responseFromUserReviews(reviews)

}

export const modifyUserInfo = async(data:Record<string, any>, userId:number)=>{
  console.log("서비스 레이어의 modifyUserInfo에 도달했습니다.");
  console.log("수정할 유저 ID(서비스 레이어):", userId);  
  for (const preference of data.preferences) {
    await setPreference(Number(userId), preference);
  }
  const modifiedUser = await updateUserInfo(data, userId);
  const preferences = await getUserPreferencesByUserId(userId);
  console.log(modifiedUser);
  console.log(preferences);

  try {const result = responseFromUser({ user: modifiedUser, preferences }); return result;}
  catch (error) {console.error("responseFromUser에서 오류 발생:", error);}
  
}
