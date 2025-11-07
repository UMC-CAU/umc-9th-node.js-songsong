//리포지토리 함수 임포트 필요: addRestaurant(insert)
import {addRestaurant, getMissionIdByRestaurantId, getMissionStatusIdByMissionId, getReviewsByMissionStatusId} from "../repositories/restaurant.repository.js"
import {responseFromRestaurant, responseFromReviews} from "../dtos/restaurant.dto.js"
import {responseFromMissions} from "../dtos/mission.dto.js"
import {getMissionsByRestaurantId} from "../repositories/mission.repository.js"
export const createRestaurant = async(data:any)=>{
    const restaurantId = await addRestaurant({
        name: data.name,
        districtId : data.districtId
    })

    if(restaurantId==null){
        throw new Error("문제가 발생했습니다.")
    }

    return responseFromRestaurant(data, restaurantId)

}
//repository함수 총 3개 호출 필요.. 1. data(=restaurantID)로 mission테이블에서 mission Id검색 : getMissionIdByRestaurantId
//2. mission ID로 mission_status 테이블에서 mission_status_id검색 : getMissionStatusIdByMissionId
//3. review테이블에서 mission_status_id가진 리뷰 쫙 검색. : getReviewsByMissionStatusId
export const listRestaurantReviews = async(data:any, cursor:number)=>{
    const missionId = await getMissionIdByRestaurantId(data)
    const missionStatusId = await getMissionStatusIdByMissionId(missionId)
    const reviews = await getReviewsByMissionStatusId(missionStatusId, cursor)
    return responseFromReviews(reviews)
}

// 필요한 repository함수는.. mission테이블에서 restaurantId 검색하는 함수 하나. getMissionsByRestaurantId
export const listRestaurantMissions = async(restaurantId:number, cursor:number)=>{
    const missions = await getMissionsByRestaurantId(restaurantId, cursor)
    return responseFromMissions(missions)
}