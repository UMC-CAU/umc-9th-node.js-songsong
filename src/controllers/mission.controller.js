import { StatusCodes } from "http-status-codes";
import {bodyToChallenge, bodyToMissionStatus} from "../dtos/mission.dto.js"
import {createChallenge, changeMissionStatus} from "../services/mission.service.js"

export const handleCreateChallenge = async(req, res, next)=>{
    console.log("미션 도전을 요청했습니다.")
    console.log("body:", req.body)

    const {missionId} = req.params
    const missionData = bodyToChallenge(req.body, missionId)
    const mission = await createChallenge(missionData)
    res.status(StatusCodes.OK).json({ result: mission });

}

export const handleChangeMissionStatus = async(req, res, next)=>{
    console.log("진행 중 미션을 진행 완료로 수정하기를 요청했습니다.")
    console.log("body:", req.body)
    const {userId, missionId} = req.params
    console.log(userId)
    console.log(missionId)
    const changedStatus = bodyToMissionStatus(req.body)
    const result = await changeMissionStatus(userId, missionId, changedStatus)
    res.status(StatusCodes.OK).json({result:result})
}