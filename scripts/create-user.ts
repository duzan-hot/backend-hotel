import "dotenv/config";

import inquirer from "inquirer";
import chalk from "chalk";

import { connectDB } from "../src/database/connection";

import Usuario from "../src/database/models/usuarios";

import bcrypt from "bcrypt";

// ===============================
// Crear Usuario
// ===============================

async function createUser() {

  try {

    // conectar mongo
    await connectDB();

    console.log(
      chalk.yellow("=== Crear Usuario ===")
    );

    // ===============================
    // Preguntas
    // ===============================

    const questions: any[] = [

    {
        type: "input",
        name: "nombre",
        message: "Nombre:",
    },

    {
        type: "input",
        name: "apellido_paterno",
        message: "Apellido paterno:",
    },

    {
        type: "input",
        name: "apellido_materno",
        message: "Apellido materno:",
    },

    {
        type: "input",
        name: "carnet_identidad",
        message: "Carnet de identidad:",
    },

    {
        type: "password",
        name: "password",
        message: "Password:",
        mask: "*",
    },

    {
        type: "list",
        name: "rol",
        message: "Rol:",
        choices: [
        "ADMIN",
        "GERENTE",
        "INFORMACIONES",
        ],
    },

    ];

    const answers = await inquirer.prompt(
    questions
    );

    // ===============================
    // Verificar duplicado
    // ===============================

    const existe = await Usuario.findOne({
      carnet_identidad:
        answers.carnet_identidad,
    });

    if (existe) {

      console.log(
        chalk.red(
          "❌ Ya existe un usuario con ese carnet"
        )
      );

      process.exit(1);

    }

    // ===============================
    // Encriptar password
    // ===============================

    const hashedPassword =
      await bcrypt.hash(
        answers.password,
        10
      );

    // ===============================
    // Crear usuario
    // ===============================

    const usuario =
      await Usuario.create({

        nombres: answers.nombre,

        ap_paterno:
          answers.apellido_paterno,

        ap_materno:
          answers.apellido_materno,

        ci:
          answers.carnet_identidad,

        rol: answers.rol,

        password: hashedPassword,

      });

    console.log(
      chalk.green(
        `✅ Usuario creado: ${usuario.nombres}`
      )
    );

    process.exit(0);

  } catch (error) {

    console.error(
      chalk.red(
        "❌ Error creando usuario"
      ),
      error
    );

    process.exit(1);

  }

}

createUser();
