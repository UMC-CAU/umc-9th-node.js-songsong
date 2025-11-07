

export const bodyToRestaurant=(body, districtId)=>{
    return {
        name : body.name,
        districtId,
    }
}

export const responseFromRestaurant = (restaurant, restaurantId)=>{
    return {
        success : true,
        code : "S200",
        message : "가게 추가가 성공적으로 완료되었습니다.",
        data:{
            id:restaurantId,
            districtId:restaurant.districtId,
            name:restaurant.name,
        }
    }
}

export const responseFromReviews = (reviews)=>{
    return{
        success: true,
        code: "S200",
        data: reviews,
        pagination:{
            cursor: reviews.length? reviews[reviews.length-1].id : null,
        },
    }
}