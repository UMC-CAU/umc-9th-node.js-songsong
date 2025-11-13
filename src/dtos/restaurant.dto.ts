

export const bodyToRestaurant=(body:Record<string, any>, districtId:number)=>{
    return {
        name : body.name,
        districtId,
    }
}

export const responseFromRestaurant = (restaurant:Record<string, any>, restaurantId:number)=>{
    return {
            restaurantId:restaurantId,
            restaurant
        }     
}

export const responseFromReviews = (reviews:Record<string, any>)=>{
    return{
        reviews,
        pagination:{
            cursor: reviews.length? reviews[reviews.length-1].id : null,
        },
    }
}