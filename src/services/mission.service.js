import { addChallenge, getChallenge, checkChallengeStatus, alterMissionStatus, getMission } from "../repositories/mission.repository.js";
import { responseFromChallenge, responseFromChangedMission } from "../dtos/mission.dto.js";

export const createChallenge = async (data) => {
  // 중복 확인
  const existing = await checkChallengeStatus({
    missionId: data.missionId,
    userId: data.userId
  });
  if (existing) throw new Error("이미 도전 중인 미션입니다.");

  // mission_status 추가
  const challengeId = await addChallenge({
    missionId: data.missionId,
    userId: data.userId,
    status: "ON_GOING"
  });

  // 추가된 행 조회
  const challenge = await getChallenge(challengeId);

  // 응답 DTO 변환
  return responseFromChallenge({ id: Number(challenge.id), userid: Number(challenge.userId), missionId: Number(challenge.missionId), status:challenge.status });
};

//respository1. getmissionStatus(userId, missionId) =>존재하지 않거나 success이면 에러. on_going이면 바꿈.
//repository2. alterMissionStatus(userId, missionId, changedStatus) => changedStatus로 바꿈
export const changeMissionStatus = async(userId, missionId, changedStatus)=>{
  const result = await checkChallengeStatus({userId, missionId})
  console.log(result)
  if(result==null) throw new Error("존재하지 않는 리뷰입니다.")
  else if(result.status=="SUCCESS") throw new Error("이미 완료한 미션입니다.")
  else if(result.status=="ON_GOING") {
    alterMissionStatus(userId, missionId, changedStatus)
    const modifiedResult = await getMission(userId, missionId)
    return responseFromChangedMission(modifiedResult)
  }
  else throw new Error(`정의되지 않은 status입니다. : ${result.status}`)
}
