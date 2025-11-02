import {pool} from "../db.config.js"

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