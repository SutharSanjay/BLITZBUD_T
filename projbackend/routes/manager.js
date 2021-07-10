const express = require("express")
const router = express.Router()

const {getUser,getUserById,updateUser,removeUser, removeById, getAllManager} = require("../controllers/manager")
const {isAdmin,isAuthenticated,isSignedIn} = require("../controllers/auth")

router.param("managerID",getUserById)
router.param("adminmanagerID",removeById)

router.put("/manager/update/:adminmanagerID",updateUser)

router.get("/manager/update/:adminmanagerID/:managerID",isSignedIn,isAuthenticated,getUser)

router.get("/manager/remove/:adminmanagerID/:managerID",isSignedIn,isAuthenticated,isAdmin,removeUser)

router.get("/manager/all/:managerID",isSignedIn,isAuthenticated,isAdmin,getAllManager)

module.exports = router