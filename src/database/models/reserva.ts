import { Schema, model, Document, Types } from "mongoose";

export enum EstadoReserva {
  ACTIVA = "activa",
  FINALIZADA = "finalizada",
  CANCELADA = "cancelada",
}

interface IClienteReserva {
  nombre: string;
  apellidos: string;
  ci: string;
  celular: string;
  celular_pariente: string;
  origen: string;
}

export interface IReserva extends Document {
  cliente: IClienteReserva;

  usuario_registro: Types.ObjectId;
  habitacion: Types.ObjectId;

  fecha_reserva: Date;
  fecha_ingreso: Date;
  fecha_salida: Date;

  cantidad_noches: number;
  costo: number;

  garaje: boolean;
  estado: EstadoReserva;

  fecha_registro: Date;
}

const ClienteSchema = new Schema<IClienteReserva>(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },

    apellidos: {
      type: String,
      required: true,
      trim: true,
    },

    ci: {
      type: String,
      required: true,
      trim: true,
    },

    celular: {
      type: String,
      required: true,
      trim: true,
    },

    celular_pariente: {
      type: String,
      default: "",
      trim: true,
    },

    origen: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const ReservaSchema = new Schema<IReserva>(
  {
    cliente: {
      type: ClienteSchema,
      required: true,
    },

    usuario_registro: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },

    habitacion: {
      type: Schema.Types.ObjectId,
      ref: "Habitacion",
      required: true,
    },

    fecha_reserva: {
      type: Date,
      default: Date.now,
    },

    fecha_ingreso: {
      type: Date,
      required: true,
    },

    fecha_salida: {
      type: Date,
      required: true,
    },

    cantidad_noches: {
      type: Number,
      required: true,
      min: 1,
    },

    costo: {
      type: Number,
      required: true,
      min: 0,
    },

    garaje: {
      type: Boolean,
      default: false,
    },

    estado: {
      type: String,
      enum: Object.values(EstadoReserva),
      default: EstadoReserva.ACTIVA,
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

export const ReservaModel = model<IReserva>(
  "Reserva",
  ReservaSchema
);