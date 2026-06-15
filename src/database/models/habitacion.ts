import { Schema, model, Document } from "mongoose";

export enum EstadoHabitacion {
  ACTIVO = "activo",
  INACTIVO = "inactivo",
  MANTENIMIENTO = "mantenimiento",
}

export interface IHabitacion extends Document {
  tipo_habitacion: string;
  numero_habitacion: number;
  piso: string;
  capacidad: number;
  precio_base: number;
  estado_general: EstadoHabitacion;
  tiene_garaje: boolean;
  fecha_registro: Date;
}

const HabitacionSchema = new Schema<IHabitacion>(
  {
    tipo_habitacion: {
      type: String,
      required: true,
      trim: true,
    },

    numero_habitacion: {
      type: Number,
      required: true,
      unique: true,
    },

    piso: {
      type: String,
      required: true,
      trim: true,
    },

    capacidad: {
      type: Number,
      required: true,
      min: 1,
    },

    precio_base: {
      type: Number,
      required: true,
      min: 0,
    },

    estado_general: {
      type: String,
      enum: Object.values(EstadoHabitacion),
      default: EstadoHabitacion.ACTIVO,
      required: true,
    },

    tiene_garaje: {
      type: Boolean,
      default: false,
    },

    fecha_registro: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    timestamps: true, // createdAt y updatedAt
  }
);

export const HabitacionModel = model<IHabitacion>(
  "Habitacion",
  HabitacionSchema
);