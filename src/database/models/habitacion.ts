import { Schema, model } from "mongoose";

export const ESTADOS_HABITACION = [
  "disponible",
  "ocupada",
  "mantenimiento",
  "limpieza",
] as const;

const HabitacionSchema = new Schema(
  {
    numero: {
      type: Number,
      required: true,
      unique: true,
    },

    tipo: {
      type: String,
      required: true,
      trim: true,
    },

    capacidad: {
      type: Number,
      required: true,
      min: 1,
    },

    descripcion: {
      type: String,
      required: true,
      trim: true,
    },

    precioBase: {
      type: Number,
      required: true,
      min: 0,
    },

    estado: {
      type: String,
      enum: ESTADOS_HABITACION,
      default: "disponible",
      required: true,
    },

    imagenes: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("Habitacion", HabitacionSchema);