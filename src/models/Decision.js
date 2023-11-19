const {Schema, model} = require("mongoose");

// Definición del esquema "Decisiones"
const decisionSchema = new Schema({
    idReporte: { type: mongoose.Schema.Types.ObjectId, ref: 'Reporte', required: true },
    idTomadorDecisiones: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    accionTomada: { type: String, required: true },
}, { timestamps: true });

module.exports = model('Decision', decisionSchema);
