const express = require('express');
const router = express.Router();
const TeacherApiController = require('../controllers/teacherController');
const upload = require('../middlewares/upload');

router.get('/teacher', TeacherApiController.showTeachers);

router.post('/teacher', upload.single('image'), TeacherApiController.createTeacher);

router.put('/teacher/:teacherId', upload.single('image'), TeacherApiController.updateTeacher);

router.delete('/teacher/:teacherId', TeacherApiController.deleteTeacher);

module.exports = router;
