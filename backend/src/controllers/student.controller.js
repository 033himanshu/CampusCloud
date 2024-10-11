import { Attendence } from "../models/attendence.model.js"
import { Material } from "../models/material.model.js"
import { Question } from "../models/question.model.js"
import { Quiz } from "../models/quiz.model.js"
import { Student } from "../models/student.model.js"
import { Subject } from "../models/subject.model.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { sendSuccess } from "../utils/sendSuccess.js"
class StudentController{
    constructor(){
    }
    getAssignedSubjects = asyncHandler(async (req, res)=> {
        const {userId} = req.user
        const user = await Student.findOne({user : userId})
        const classes = await Subject.find({sem : user.sem, course : user.course}).populate("class")
        return sendSuccess(res, classes, "Student Subjects Fetched")
    })
    getClassMaterial = asyncHandler(async (req, res)=> {
        const {classRef} = req.body
        const {userId} = req.user

        const classExists = await Attendence.findOne({classRef, student:userId})
        if(!classExists)
            throw new ApiError(403, "Not enrolled in this subject")

        const material = await Material.find({classRef}).sort({createdAt : -1})

        return sendSuccess(res, material, "Material fetched")
    }) 
    getAttendenceInSubject = asyncHandler(async (req, res)=>{
        const {userId} = req.user
        const {classRef}= req.body
        const attendence = await Attendence.findOne({classRef, student : userId}).select("attendence")
        return sendSuccess(res, attendence, "Attendence retrieved")
    })
    fetchQuiz = asyncHandler(async (req, res)=>{
        const {userId} = req.user
        const {materialId} = req.body
        const material = await Material.findById(materialId)
        if(!material || material.materialType!="test") 
            throw new ApiError(404, "Invalid Material Id")
            
        const attendance = await Attendence.find({student : userId, classRef : material.classRef})
        if(!attendance)
            throw new ApiError(404, "Student not elligible to give this quiz")

        const quiz = await Quiz.find({material : materialId})
        const isQuizAttempted = quiz ? true : false;
        const questions = []
        for(let i=0; i<material.questions.length(); ++i){
            let quesId = material.questions[i]
            let ques = {}
            if(isQuizAttempted){
                ques = await Question.findById(quesId)
                ques["choosedOption"] = quiz.answers[i]
            }else{
                ques = await Question.findById(quesId).select("-correctOptions")
            }
            questions.push(ques)
        }
        return sendSuccess(res, questions, "Fetched Quiz")
    })
    
    submitQuiz = asyncHandler( async (req, res)=> {
        const {userId} = req.user
        const { materialId, answers} = req.body;

        const material = await Material.findById(materialId)
        if(!material || material.materialType!="test") 
            throw new ApiError(404, "Invalid Material Id")
            
        const attendance = await Attendence.find({student : userId, classRef : material.classRef})
        if(!attendance)
            throw new ApiError(404, "Student not elligible to Submit this quiz")
        if(answers.length()!=material.questions.length())
            throw new ApiError(401, "no. of answers should be same as no. of questions")
        let quiz = await Quiz.find({material : materialId})
        if(quiz)
            throw new ApiError(403, "Quiz already attempted")
        let score = 0
        for(let i=0; i<material.questions.length(); ++i){
            let quesId = material.questions[i]
            ques = await Question.findById(quesId)
            if(answerMatch(answers[i], ques.correctOptions[i])){
                score +=1
            }
        }

        quiz = await Quiz.create({
            material: materialId,
            student : userId,
            answers,
            score,
        })
        return sendSuccess(res, quiz, "Quiz Submitted successfully");
    })

    getQuizScore = asyncHandler( async (req, res)=>{
        const {userId} = req.user
        const { materialId} = req.body;

        const material = await Material.findById(materialId)
        if(!material || material.materialType!="test") 
            throw new ApiError(404, "Invalid Material Id")
            
        const attendance = await Attendence.find({student : userId, classRef : material.classRef})
        if(!attendance)
            throw new ApiError(404, "Student not elligible for this quiz")
        
        let quiz = await Quiz.find({material : materialId})
        const score = !quiz ? "--" : quiz.score
        
        return sendSuccess(res, score, "Quiz Score")
        
    })
}

const studentController = new StudentController()

export const {
    getAssignedSubjects,
    getClassMaterial,
    getAttendenceInSubject,
    fetchQuiz,
    submitQuiz,
    getQuizScore,
} = studentController