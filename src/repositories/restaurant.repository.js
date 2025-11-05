import {pool} from "../db.config.js"
import {prisma} from "../db.config.js"

export const addRestaurant = async({name, districtId})=>{
    const conn = await pool.getConnection()
    try{
        const [result] = await conn.query(`INSERT INTO restaurant (name, district_id) VALUES(?, ?);`, [name, districtId])
        return result.insertId
    }
    catch(err){
        console.log(`가게 추가 중 에러가 발생했습니다. (${err.message})`)
    }
    finally{
        conn.release()
    }
}

//restaurantId가진 미션Id여럿 검색
export const getMissionIdByRestaurantId = async(data)=>{
    const missions = await prisma.mission.findMany({
        select:{
            id:true
        },
        where: {restaurantId : BigInt(data)},
    })
    return missions
}

//missionId로 missionStatusId찾기
export const getMissionStatusIdByMissionId = async(missions)=>{

    const missionIds = missions.map((m)=>BigInt(m.id))

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

export const getReviewsByMissionStatusId = async(missionStatusId, cursor)=>{

    const missionStatusIds = missionStatusId.map((m)=>BigInt(m.id))
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