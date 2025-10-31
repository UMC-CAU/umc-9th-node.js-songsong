import { addChallenge, getChallenge, checkChallengeStatus } from "../repositories/mission.repository.js";
import { responseFromChallenge } from "../dtos/mission.dto.js";

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
  return responseFromChallenge({ ...challenge, missionStatusId: challengeId });
};
