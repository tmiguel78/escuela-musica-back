const express = require('express');
const router = express.Router();
const TeacherApiController = require('../controllers/teacherController');
const upload = require('../middlewares/upload');
const verifyToken = require('../middlewares/auth');

router.get('/teacher', TeacherApiController.showTeachers);

router.post('/teacher', verifyToken, upload.single('image'), TeacherApiController.createTeacher);

router.put('/teacher/:teacherId', verifyToken, upload.single('image'), TeacherApiController.updateTeacher);

router.delete('/teacher/:teacherId', verifyToken, TeacherApiController.deleteTeacher);

module.exports = router;
