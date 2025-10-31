import { pool } from "../db.config.js";

//유저가 특정 미션에 새로 도전할 때 mission_status 테이블에 레코드 추가
export const addChallenge = async ({ missionId, userId, status }) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      "INSERT INTO mission_status (status, mission_id, user_id) VALUES (?, ?, ?)",
      [status, missionId, userId]
    );
    return result.insertId; // 새 mission_status의 PK(id)
  } catch (err) {
    throw new Error(`미션 도전 추가 중 오류가 발생했습니다. (${err.message})`);
  } finally {
    conn.release();
  }
};


//방금 생성된 mission_status 행을 조회해서 반환

export const getChallenge = async (challengeId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      "SELECT id, mission_id, user_id, status, created_at, updated_at FROM mission_status WHERE id = ?",
      [challengeId]
    );
    return rows[0] || null;
  } catch (err) {
    throw new Error(`미션 도전 조회 중 오류가 발생했습니다. (${err.message})`);
  } finally {
    conn.release();
  }
};


//특정 유저가 이미 해당 미션에 도전 중인지 확인
export const checkChallengeStatus = async ({ missionId, userId }) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      "SELECT id, status FROM mission_status WHERE mission_id = ? AND user_id = ?",
      [missionId, userId]
    );
    return rows[0] || null; // 이미 도전 중이면 해당 행 반환
  } catch (err) {
    throw new Error(`미션 도전 상태 확인 중 오류가 발생했습니다. (${err.message})`);
  } finally {
    conn.release();
  }
};
