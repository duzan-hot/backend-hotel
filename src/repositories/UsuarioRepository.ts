import Usuario from "../database/models/usuarios";
import bcrypt from "bcrypt";

export default class UsuarioRepository {

  
  async getById(id: string) {
    return await Usuario.findById(id);
  }

  
  async getAuthByCarnet(carnet: string) {
    return await Usuario.findOne({ carnet_identidad: carnet }).select("+password");
  }

  // 🔑 Comparar contraseña
  async comparePassword(plain: string, hash: string) {
    return await bcrypt.compare(plain, hash);
  }

  
  async create(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await Usuario.create({
      ...data,
      password: hashedPassword,
    });
  }
}
