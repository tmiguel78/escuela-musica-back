const Teacher = require('../models/Teacher');

const TeacherApiController = {
    showTeachers : async (req, res) => {
        try {
            const teachers = await Teacher.find();
            res.status(200).json(teachers)
        } catch (error) {
            console.error(error)
            res.status(500).json({ mensaje : 'Error obteniendo los profesores.'})
        }
    },
    createTeacher : async (req,res) => {
        try {
            const { name, image, curriculum } = req.body
            if ([ name, image, curriculum ].some(value => !value)) {
                return res.status(400).json({ error: "Faltan campos obligatorios" });
                }

            const newTeacher = await Teacher.create(req.body);
            res.status(201).json(newTeacher)
            
        } catch (error) {
            console.error(error)
            res.status(500).json({ mensaje : 'Error registrando el nuevo profesor.'})
        }
    },
    updateTeacher : async (req,res) => {
        try {
            const teacherId = req.params.teacherId;
            const { name, image, curriculum } = req.body;
            const updatedTeacher = await Teacher.findByIdAndUpdate(teacherId, 
                { name, image, curriculum },  
                { returnDocument: 'after' });

            if (!updatedTeacher) {
                return res.status(404).json({ error: 'Profesor no encontrado.' })
            }

            res.status(200).json({updatedTeacher})
            
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Error actualizando datos del profesor.' })
        }
    },
    deleteTeacher : async (req,res) => {
        try {
            const teacherId = req.params.teacherId;
            const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);

            if (!deletedTeacher) {
                return res.status(404).json({ mensaje: 'Profesor no encontrado.' })
            }

            res.status(200).json({ mensaje: 'Profesor eliminado con éxito.' })
            
        } catch (error) {
            console.error(error)
            res.status(500).json({ mensaje : "Error borrando el profesor." })
        }
    }
 };

 module.exports = TeacherApiController;