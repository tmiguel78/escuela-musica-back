const Instrument = require('../models/Instrument');
const uploadToCloudinary = require('../middlewares/uploadToCloudinary');

const InstrumentApiController = {
    showInstruments : async (req, res) => {
        try {
            const instruments = await Instrument.find();
            res.status(200).json(instruments)
        } catch (error) {
            console.log(error)
            res.status(500).json({ mensaje : 'Error obteniendo los instrumentos.' })
        }
    },
    createInstrument : async (req, res) => {
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(404).json({ mensaje : 'Falta el nombre del instrumento.'})
            }
            if (!req.file) {
                return res.status(404).json({ mensaje : 'Falta la imagen por seleccionar.'})
            }

            const result = await uploadToCloudinary(req.file.buffer, 'instruments');
            const imageUrl = result.secure_url;

            const newInstrument = await Instrument.create(
                { name, image: imageUrl, uid: req.uid }
            )
            res.status(201).json(newInstrument);
            
        } catch (error) {
            console.log(error)
            res.status(500).json({ mensaje : "Error creando el instrumento." })
        }
    },
    updateInstrument : async (req, res) => {
        try {
            const instrumentId = req.params.instrumentId;
            const { name } = req.body;

            let imageUrl = null;
            if(req.file) {
                const result = await uploadToCloudinary(req.file.buffer, 'instruments');
                imageUrl = result.secure_url;
            }

            const updatedInstrument = await Instrument.findByIdAndUpdate(instrumentId,
                { 
                 name,
                 ...(imageUrl && { image : imageUrl})
                },
                { returnDocument : 'after'}
            )
            if(!updatedInstrument) {
                return res.status(404).json({ mensaje: 'Instrumento no encontrado.' })
            }
            
            res.status(200).json(updatedInstrument)
            
        } catch (error) {
            console.log(error)
            res.status(500).json({ mensaje : "Error actualizando el instrumento."})
        }
    }, 
    deleteInstrument : async (req, res) => {
        try {
            const instrumentId = req.params.instrumentId;
            const deletedInstrument = await Instrument.findByIdAndDelete(instrumentId);

            if (!deletedInstrument) {
                res.status(404).json({ mensaje : "No se ha encontrado el instrumento."})
            }

            res.status(200).json({ mensaje : "Instrumento borrado con éxito."})
            
        } catch (error) {
            console.log(error)
            res.status(500).json({ mensaje : "Error borrando el instrumento." })
        }
    }

};

module.exports = InstrumentApiController;