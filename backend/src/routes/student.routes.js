import {Router} from "express"
import {upload} from '../middlewares/multer.middleware.js'
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router = Router()

import {
    getAssignedSubjects,
    getClassMaterial,
    getAttendenceInSubject,
    fetchQuiz,
    submitQuiz,
    getQuizScore,
} from "../controllers/student.controller.js"


router.use(verifyJWT)
router.route('/get-assigned-subjects').post(getAssignedSubjects)
router.route('/get-class-material').post(getClassMaterial)
router.route('/get-attendence-in-subject').post(getAttendenceInSubject)
router.route('/fetch-quiz').post(fetchQuiz)
router.route('/submit-quiz').post(submitQuiz)
router.route('/get-quiz-score').post(getQuizScore)

export default router