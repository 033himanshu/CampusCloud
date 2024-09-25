import {Router} from "express"
import {upload} from '../middlewares/multer.middleware.js'
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router = Router()

import {
    getAssignedSubjects,
    getClassMaterial,
    getAttendenceInSubject,
} from "../controllers/student.controller.js"


router.use(verifyJWT)
router.route('/get-assigned-subjects').get(getAssignedSubjects)
router.route('/get-class-material').get(getClassMaterial)
router.route('get-attendence-in-subject').get(getAttendenceInSubject)

export default router