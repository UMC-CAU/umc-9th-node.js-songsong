import { StatusCodes } from "http-status-codes";
import {bodyToChallenge} from "../dtos/mission.dto.js"
import {createChallenge} from "../services/mission.service.js"

export const handleCreateChallenge = async(req, res, next)=>{
    console.log("미션 도전을 요청했습니다.")
    console.log("body:", req.body)

    const {missionId} = req.params
    const missionData = bodyToChallenge(req.body, missionId)
    const mission = await createChallenge(missionData)
    res.status(StatusCodes.CREATED).json({ result: mission });

}