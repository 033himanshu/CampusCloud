import {Router} from "express"
import {upload} from '../middlewares/multer.middleware.js'
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router = Router()

import {
    userLogin,
    userLogout,
    refreshAccessToken,
    updateAccountInfo,
    getCurrentUser,
    updateProfileImage,
    deleteUserProfileImage,
    getNotifications,
    readNotification,
} from "../controllers/user.controller.js"

router.route('/login').post(userLogin)

router.route('/refresh-token').post(refreshAccessToken)
router.use(verifyJWT)

router.route('/logout').post(userLogout)
router.route('/get-current-user').post(getCurrentUser)



router.route('/update-account-info').post(updateAccountInfo)
router.route('/update-profile-image').post(
    upload.single("profile"),
    updateProfileImage
)
router.route('/delete-user-profile-image').post(deleteUserProfileImage)
router.route('/get-notifications').get(getNotifications)
router.route('/read-notification').post(readNotification)



export default router