import { Schema, model } from "mongoose";

export const ESTADOS_RESERVA = [
  "pendiente",
  "confirmada",
  "check_in",
  "check_out",
  "cancelada",
] as const;

const HabitacionReservaSchema = new Schema(
  {
    id_habitacion: {
      type: Schema.Types.ObjectId,
      ref: "Habitacion",
      required: true,
    },

    numero_Habitacion: {
      type: Number,
      required: true,
    },

    tipo_Habitacion: {
      type: String,
      required: true,
    },

    precio_Noche: {
      type: Number,
      required: true,
      min: 0,
    },

    cantidad_Noches: {
      type: Number,
      required: true,
      min: 1,
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const ServicioReservaSchema = new Schema(
  {
    id_servicio: {
      type: Schema.Types.ObjectId,
      ref: "Servicio",
      required: true,
    },

    nombre_Servicio: {
      type: String,
      required: true,
    },

    precio_Unitario: {
      type: Number,
      required: true,
      min: 0,
    },

    cantidad: {
      type: Number,
      required: true,
      min: 1,
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const ReservaSchema = new Schema(
  {
    id_usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },

    fecha_Reserva: {
      type: Date,
      default: Date.now,
      required: true,
    },

    fecha_Ingreso: {
      type: Date,
      required: true,
    },

    fecha_Salida: {
      type: Date,
      required: true,
    },

    estado: {
      type: String,
      enum: ESTADOS_RESERVA,
      default: "pendiente",
      required: true,
    },

    habitaciones: {
      type: [HabitacionReservaSchema],
      default: [],
    },

    servicios: {
      type: [ServicioReservaSchema],
      default: [],
    },

    subtotal_Habitaciones: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    subtotal_Servicios: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    impuestos: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    descuento: {
      type: Number,
      default: 0,
      min: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    observaciones: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Reserva", ReservaSchema);