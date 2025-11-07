// const express = require('express')  // -> CommonJS
import express from 'express'          // -> ES Module
import dotenv from "dotenv"
import cors from "cors" //이 부분은 워크북에 안 나와 있는데 추가해야 제대로 실행된다.
import {handleUserSignUp, handleListUserReviews} from "../src/controllers/user.controller.js" //이 부분도 추가해줘야 실행된다.
import {handleCreateReview} from "../src/controllers/review.controller.js"
import {handleCreateChallenge, handleChangeMissionStatus} from "../src/controllers/mission.controller.js"
import {handleCreateRestaurant, handleListRestaurantReviews, handleListRestaurantMissions} from "../src/controllers/restaurant.controller.js"
import type { Request, Response, } from "express";



dotenv.config()

const app = express()
const port: number = Number(process.env.PORT) || 3000;

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})