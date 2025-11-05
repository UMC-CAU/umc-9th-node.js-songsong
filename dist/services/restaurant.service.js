//리포지토리 함수 임포트 필요: addRestaurant(insert)
import { addRestaurant } from "../repositories/restaurant.repository.js";
import { responseFromRestaurant } from "../dtos/restaurant.dto.js";
export const createRestaurant = async (data) => {
    const restaurantId = await addRestaurant({
        name: data.name,
        districtId: data.districtId
    });
    if (restaurantId == null) {
        throw new Error("문제가 발생했습니다.");
    }
    return responseFromRestaurant(data, restaurantId);
};
//# sourceMappingURL=restaurant.service.js.map