import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp, listUserReviews } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).json({ result: user });
};

export const handleListUserReviews = async(req, res, next)=>{
    console.log("리뷰 목록 조회를 요청했습니다.")

    const {userId} = req.params
    const reviews = await listUserReviews(
      Number(userId), 
      typeof req.query.cursor === "string"? Number(req.query.cursor) : 0 
    )
    res.status(StatusCodes.OK).json({result:reviews})
      
}