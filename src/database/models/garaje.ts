import { Schema, model, Document } from "mongoose";

export enum EstadoGaraje {
  ACTIVO = "activo",
  INACTIVO = "inactivo",
}

export interface IGaraje extends Document {
  capacidad_total: number;
  autos_ocupados: number;
  estado: EstadoGaraje;
  fecha_registro: Date;
}

const GarajeSchema = new Schema<IGaraje>(
  {
    capacidad_total: {
      type: Number,
      required: true,
      min: 0,
    },

    autos_ocupados: {
      type: Number,
      default: 0,
      min: 0,
    },

    estado: {
      type: String,
      enum: Object.values(EstadoGaraje),
      default: EstadoGaraje.ACTIVO,
      required: true,
    },

    fecha_registro: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const GarajeModel = model<IGaraje>(
  "Garaje",
  GarajeSchema
);