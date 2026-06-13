import { Schema, model } from "mongoose";

export const ROLES = [
  "cliente",
  "admin",
] as const;

export const ESTADOS = [
  "activo",
  "inactivo",
  "bloqueado",
] as const;

const UsuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },

    apellido: {
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

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    telefono: {
      type: String,
      required: true,
      trim: true,
    },

    direccion: {
      type: String,
      required: true,
      trim: true,
    },

    estado: {
      type: String,
      enum: ESTADOS,
      default: "activo",
      required: true,
    },

    rol: {
      type: String,
      enum: ROLES,
      default: "cliente",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Usuario", UsuarioSchema);