export const bodyToRestaurant = (body, restaurantId) => {
    return {
        name: body.name,
        districtId: body.districtId,
    };
};
export const responseFromRestaurant = (restaurant, restaurantId) => {
    return {
        success: true,
        code: "S200",
        message: "가게 추가가 성공적으로 완료되었습니다.",
        data: {
            id: restaurantId,
            districtId: restaurant.districtId,
            name: restaurant.name,
        }
    };
};
//# sourceMappingURL=restaurant.dto.js.map