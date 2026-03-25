const Bulletin = require('../models/Bulletin');
const uploadToCloudinary = require('../middlewares/uploadToCloudinary');

const BulletinApiController = {
    showBulletin : async (req, res) => {
        try {
            const bulletin = await Bulletin.find();
            res.status(200).json(bulletin)
        } catch (error) {
            console.error(error)
            res.status(500).json({ mensaje : 'Error obteniendo los anuncios.'})
        }
    },
    createBulletin : async (req,res) => {
        try {
            const { text } = req.body;
            if (!text) {
                return res.status(400).json({ error: "Faltan campos obligatorios" });
                }
            let imageUrl = null;
            if (req.file) {
                const result = await uploadToCloudinary(req.file.buffer, 'bulletins');
                imageUrl = result.secure_url;
            }

            const newBulletin = await Bulletin.create({ text, image : imageUrl});
            res.status(201).json(newBulletin)
            
        } catch (error) {
            console.error(error.message)
            res.status(500).json({ mensaje : 'Error registrando el nuevo anuncio.', detalle: error.message})
        }
    },
    updateBulletin : async (req,res) => {
        try {
            const bulletinId = req.params.bulletinId;
            const { text } = req.body;

            let imageUrl = null;
            if (req.file) { 
                const result = await uploadToCloudinary(req.file.buffer, 'bulletins');
                imageUrl = result.secure_url;
            };

            const updatedBulletin = await Bulletin.findByIdAndUpdate(bulletinId, 
                { text, ...(imageUrl && {image : imageUrl})},  
                { returnDocument: 'after' });

            if (!updatedBulletin) {
                return res.status(404).json({ mensaje: 'Anuncio no encontrado.' })
            }

            res.status(200).json(updatedBulletin)
            
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Error actualizando datos del anuncio.' })
        }
    },
    deleteBulletin : async (req,res) => {
        try {
            const bulletinId = req.params.bulletinId;
            const deletedBulletin = await Bulletin.findByIdAndDelete(bulletinId);

            if (!deletedBulletin) {
                return res.status(404).json({ mensaje: 'Anuncio no encontrado.' })
            }

            res.status(200).json({ mensaje: 'Anuncio eliminado con éxito.' })
            
        } catch (error) {
            console.error(error)
            res.status(500).json({ mensaje : "Error borrando el anuncio." })
        }
    }
 };

 module.exports = BulletinApiController;