//함수 이름	역할
//getMissionStatusId({ userId, missionId })	mission_status 테이블에서 id 찾기
//addReview({ content, missionStatusId })	review 테이블에 insert
//getReview(reviewId)	review 테이블에서 row 조회

import { pool } from "../db.config.js";

export const getMissionStatusId = async ({ userId, missionId }) => {
    console.log(userId, missionId)
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      "SELECT id FROM mission_status WHERE mission_id = ? AND user_id = ?",
      [missionId, userId]
      
    );

    // 결과가 없으면 null 반환
    if (rows.length === 0) {
      return null;
    }



    return rows[0].id;
  } catch (err) {
    throw new Error(`오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err.message})`);
  } finally {
    conn.release();
  }
};

export const addReview = async ({ content, missionStatusId }) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      "INSERT INTO review (content, mission_status_id) VALUES (?, ?)",
      [content, missionStatusId]
    );
    return result.insertId; // 새로 추가된 리뷰의 id 반환
  } catch (err) {
    throw new Error(`리뷰 추가 중 오류가 발생했습니다. (${err.message})`);
  } finally {
    conn.release();
  }
};

export const getReview = async (reviewId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      "SELECT id, content, mission_status_id FROM review WHERE id = ?",
      [reviewId]
    );

    if (rows.length === 0) {
      return null; // 존재하지 않는 리뷰
    }

    return rows[0];
  } catch (err) {
    throw new Error(`리뷰 조회 중 오류가 발생했습니다. (${err.message})`);
  } finally {
    conn.release();
  }
};