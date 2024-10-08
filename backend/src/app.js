import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import {corsOrigin} from "./constants.js"

const app = express()
app.use(cors({
    origin : corsOrigin,
    credentials: true,
}))
console.log('cors', corsOrigin)
// app.use(cors({credentials: true,}))

app.use(express.json({
    limit : "16kb",
}))
app.use(express.urlencoded({extended: true, limit:"16kb"})) // extended because we can give object under another object
app.use(express.static("public"))
app.use(cookieParser())

const apiVersion = "/api/v1"

import adminRouter from "./routes/admin.routes.js"
import teacherRouter from "./routes/teacher.routes.js"
import studentRouter from "./routes/student.routes.js"
import userRouter from "./routes/user.routes.js"
app.use(`${apiVersion}`, userRouter)
app.use(`${apiVersion}/a`, adminRouter)
app.use(`${apiVersion}/t`, teacherRouter)
app.use(`${apiVersion}/s`, studentRouter)
app.get(`${apiVersion}/health-check`, (req, res)=>{
    return  res.status(200).json({message : "EveryThing workinig fine"})
})
app.get('*', (req, res)=>{
    return res.status(400).json({message : "Invalid Request"})
})
export {app}