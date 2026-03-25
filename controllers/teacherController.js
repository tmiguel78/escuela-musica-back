const Teacher = require('../models/Teacher');
const uploadToCloudinary = require('../middlewares/uploadToCloudinary');

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
            const { name, curriculum } = req.body;
            if ([ name, curriculum ].some(value => !value)) {
                return res.status(400).json({ error: "Faltan campos obligatorios" });
                }
            
            if (!req.file) { return res.status(400).json({ error : "Falta adjuntar una imagen."})};

            const result = await uploadToCloudinary(req.file.buffer, 'teachers');
            const imageUrl = result.secure_url;

            const newTeacher = await Teacher.create({
                name , image : imageUrl , curriculum
            });
            res.status(201).json(newTeacher)
            
        } catch (error) {
            console.error(error)
            res.status(500).json({ mensaje : 'Error registrando el nuevo profesor.'})
        }
    },
    updateTeacher : async (req,res) => {
        try {
            const teacherId = req.params.teacherId;
            const { name, curriculum } = req.body;
            let imageUrl = null;
            if (req.file) { 
                const result = await uploadToCloudinary(req.file.buffer, 'teachers');
                imageUrl = result.secure_url;
            };
            
            const updatedTeacher = await Teacher.findByIdAndUpdate(teacherId, 
                { name, ...(imageUrl && { image: imageUrl}), curriculum },  
                { returnDocument: 'after' });

            if (!updatedTeacher) {
                return res.status(404).json({ error: 'Profesor no encontrado.' })
            }

            res.status(200).json(updatedTeacher)
            
        } catch (error) {
            console.error(error)
            res.status(500).json({ mensaje: 'Error actualizando datos del profesor.' })
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