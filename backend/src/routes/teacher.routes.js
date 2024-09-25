import {Router} from "express"
import {upload} from '../middlewares/multer.middleware.js'
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router = Router()

import {
    isTeacherHoD,
    assignSubjectToCourse,
    deleteSubjectFromCourse,
    assignTeacherToSubject,
    takeAttendence,
    uploadMaterial,
    makeAnnouncement,
    getAllCoursesInDepartment,
    getAllTeachersInDepartment,
    getAllSubjectInCourse,
    getAllStudentInClass,
    getAllMaterial,
} from "../controllers/teacher.controller.js"

router.use(verifyJWT)

router.route('/is-teacher-hod').get(isTeacherHoD)
router.route('/delete-subject-from-course').delete(deleteSubjectFromCourse)
router.route('/assign-subject-to-course').post(assignSubjectToCourse)
router.route('/assign-teacher-to-subject').post(assignTeacherToSubject)
router.route('/take-attendence').post(takeAttendence)
router.route('/upload-material').post(
    upload.single("material"),
    uploadMaterial
)
router.route('/get-all-material').get(getAllMaterial)
router.route('/get-all-student-in-class').get(getAllStudentInClass)



router.route('/make-announcement').post(makeAnnouncement)
router.route('/get-all-course-in-department').get(getAllCoursesInDepartment)
router.route('/get-all-subject-in-course').get(getAllSubjectInCourse)
router.route('/get-all-teachers-in-department').get(getAllTeachersInDepartment)



export default router