const express = require('express');
const router = express();
const TeacherApiController = require('../controllers/teacherController');

router.get('/teachers', TeacherApiController.showTeachers);

router.post('/teachers', TeacherApiController.createTeacher);

router.put('/teachers/:teacherId', TeacherApiController.updateTeacher);

router.delete('/teachers/:teacherId', TeacherApiController.deleteTeacher);

module.exports = router;
