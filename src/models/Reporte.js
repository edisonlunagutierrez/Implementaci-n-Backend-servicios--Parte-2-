const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Definición del esquema "Reportes"
const reporteSchema = new Schema({
    localidad: { type: String, required: true },
    barrio: { type: String, required: true },
    descripcion: { type: String, required: true },
    fechaIncidente: { type: Date, required: true },
    situacionRiesgo: { type: String, required: true },
    tipoActor: { type: String, required: true },
    ubicacion: {
        type: {
            type: String,
            required: true,
        },
        coordinates: { type: [Number], required: true },
    },
    senalTransito: {
        presente: { type: Boolean, required: false },
        tipo: { type: String },
        funcional: { type: Boolean, required: false },
        senalPropuesta: { type: String },
        argumento: { type: String },
    },
    user:{
        type: String,
        require: true,
    }
}, { timestamps: true });

module.exports = model('Reporte', reporteSchema);
