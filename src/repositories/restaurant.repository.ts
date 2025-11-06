import {prisma} from "../db.config.js"

export const addRestaurant = async(data:Record<string, any>)=>{

    const result = await prisma.restaurant.create({
        data: {
            name: data.name,
            districtId : data.districtId
        },
    })
    return BigInt(result.id)
}

//restaurantId가진 미션Id여럿 검색
export const getMissionIdByRestaurantId = async(data:number)=>{
    const missions = await prisma.mission.findMany({
        select:{
            id:true
        },
        where: {restaurantId : BigInt(data)},
    })
    return missions
}

//missionId로 missionStatusId찾기
export const getMissionStatusIdByMissionId = async(missions:any)=>{

    const missionIds = missions.map((m:any)=>BigInt(m.id))

    const missionStatusId = await prisma.missionStatus.findMany({
        select:{
            id: true
        },
        where: {
            missionId : {
                in :missionIds ,
            },
        }
    })
    return missionStatusId
}

export const getReviewsByMissionStatusId = async(missionStatusId:any, cursor:number)=>{

    const missionStatusIds = missionStatusId.map((m:any)=>BigInt(m.id))
    const reviews = await prisma.review.findMany({
        select:{
            id: true,
            content: true,
        },
        where:{
            missionStatusId:{
                in: missionStatusIds
            },
            id:{gt:cursor}
        },
        orderBy: {id:"asc"},
        take: 5,

    })

    const serialized = reviews.map((r)=>({
        ...r,
        id: (Number)(r.id)
    }))

    console.log(serialized)
    return serialized
}