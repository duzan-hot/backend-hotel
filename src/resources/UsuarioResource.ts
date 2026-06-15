export default class UsuarioResource {
  private usuario: any;

  constructor(usuario: any) {
    this.usuario = usuario;
  }

  item() {
    return {
      id: this.usuario._id,

      nombres: this.usuario.nombres,
      ap_paterno: this.usuario.ap_paterno,
      ap_materno: this.usuario.ap_materno,

      ci: this.usuario.ci,

      rol: this.usuario.rol,
      estado: this.usuario.estado,
      
      fecha_registro: this.usuario.fecha_registro,

      createdAt: this.usuario.createdAt,
      updatedAt: this.usuario.updatedAt,
    };
  }
}
