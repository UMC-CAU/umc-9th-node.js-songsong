// const express = require('express')  // -> CommonJS
import express from 'express'          // -> ES Module
import dotenv from "dotenv"
import cors from "cors" //이 부분은 워크북에 안 나와 있는데 추가해야 제대로 실행된다.
import {handleUserSignUp, handleListUserReviews} from "../src/controllers/user.controller.js" //이 부분도 추가해줘야 실행된다.
import {handleCreateReview} from "../src/controllers/review.controller.js"
import {handleCreateChallenge, handleChangeMissionStatus} from "../src/controllers/mission.controller.js"
import {handleCreateRestaurant, handleListRestaurantReviews, handleListRestaurantMissions} from "../src/controllers/restaurant.controller.js"
import type { NextFunction, Request, Response, } from "express"
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";



dotenv.config()

const app = express()
const port: number = 3000;


app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use(cookieParser())

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.1.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  const routes = ["./src/index.ts"];
  const doc = {
    info: {
      title: "UMC 9th",
      description: "UMC 9th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

/*
 * 공통 응답을 사용할 수 있는 헬퍼 함수 등록
 */
app.use((req : Request, res: Response, next: NextFunction) => {
  (res as any).success = (success:any) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  (res as any).error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

app.get('/', (req: Request, res: Response): void => {
  res.send('Hello World!')
})


app.post("/api/v1/users/signup", handleUserSignUp)
app.post("/api/v1/missions/:missionId/reviews", handleCreateReview)
app.post("/api/v1/missions/:missionId/challenges", handleCreateChallenge)
app.post("/api/v1/districts/:districtId/restaurants", handleCreateRestaurant)
app.get("/api/v1/restaurants/:restaurantId/reviews", handleListRestaurantReviews)
app.get("/api/v1/users/:userId/reviews", handleListUserReviews)
app.get("/api/v1/restaurants/:restaurantId/missions", handleListRestaurantMissions)
app.patch("/api/v1/users/:userId/missions/:missionId/status", handleChangeMissionStatus)

/**
 * 전역 오류를 처리하기 위한 미들웨어
 */
app.use((err:any, req:Request, res:Response, next:NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  (res as any).status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

