const bcrypt = require('bcryptjs')


 const mongoose = require('mongoose')


 const usuarioSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, default: 'user' }
 })

 // middleware pre

 usuarioSchema.pre("save", async function () {
    if(!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
 });


 const Usuario = mongoose.model('Usuario', usuarioSchema);

async function crearNuevoUsuario(usuario) {

    const nuevoUsuario = new Usuario(usuario);
    return await nuevoUsuario.save();

}

async function encontrarUsuarioPorEmail(email) {
    return await Usuario.findOne({email: email})

}

module.exports = {
    crearNuevoUsuario,
    encontrarUsuarioPorEmail
}