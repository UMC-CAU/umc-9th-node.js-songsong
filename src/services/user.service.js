import { responseFromUser, responseFromUserReviews } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  getMissionStatusIdByUserId,
  getUserReviews
} from "../repositories/user.repository.js";
import bcrypt from "bcrypt";

export const userSignUp = async (data) => {

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
    throw new Error("이미 존재하는 이메일입니다.");
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

export const listUserReviews = async(userId, cursor)=>{
  const reviews = await getUserReviews(await getMissionStatusIdByUserId(userId), cursor)

  return responseFromUserReviews(reviews)

}
