import { Schema, model } from "mongoose";

export const ROLES = [
  "ADMIN",
  "GERENTE",
  "INFORMACIONES",
] as const;

export const ESTADOS = [
  "ACTIVO",
  "INACTIVO",
] as const;

const UsuarioSchema = new Schema(
  {
    nombres: {
      type: String,
      required: true,
      trim: true,
    },

    ap_paterno: {
      type: String,
      required: true,
      trim: true,
    },

    ap_materno: {
      type: String,
      required: true,
      trim: true,
    },

    ci: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    rol: {
      type: String,
      enum: ROLES,
      required: true,
      default: "INFORMACIONES",
    },

    estado: {
      type: String,
      enum: ESTADOS,
      required: true,
      default: "ACTIVO",
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    fecha_registro: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Usuarios", UsuarioSchema);