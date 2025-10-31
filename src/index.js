// const express = require('express')  // -> CommonJS
import express from 'express'          // -> ES Module
import dotenv from "dotenv"
import cors from "cors" //이 부분은 워크북에 안 나와 있는데 추가해야 제대로 실행된다.
import {handleUserSignUp} from "../src/controllers/user.controller.js" //이 부분도 추가해줘야 실행된다.
import {handleCreateReview} from "../src/controllers/review.controller.js"
import {handleCreateChallenge} from "../src/controllers/mission.controller.js"

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/api/v1/users/signup", handleUserSignUp)
app.post("/api/v1/missions/:missionId/reviews", handleCreateReview)
app.post("/api/v1/missions/:missionId/challenges", handleCreateChallenge)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})