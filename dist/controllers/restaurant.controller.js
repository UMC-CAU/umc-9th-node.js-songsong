import { StatusCodes } from "http-status-codes";
import { bodyToRestaurant } from "../dtos/restaurant.dto.js";
import { createRestaurant } from "../services/restaurant.service.js";
export const handleCreateRestaurant = async (req, res, next) => {
    console.log("가게 추가를 요청했습니다.");
    console.log(req.body);
    const { districtId } = req.params;
    const restaurantData = bodyToRestaurant(req.body, districtId);
    const review = await createRestaurant(restaurantData);
    res.status(StatusCodes.OK).json({ result: review });
};
//# sourceMappingURL=restaurant.controller.js.map