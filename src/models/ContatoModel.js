const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now },
    userId: { type: String, required: true },
  });

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
  constructor(body, _id) {
    this.body = body;
    this.errors = [];
    this.contato = null;
    this._id = _id;
  }

  validaContato() {
    this.cleanUpContato();
    if (!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
    if (!this.body.email && !this.body.telefone) {
      this.errors.push('É preciso inserir um e-mail ou telefone.');
    }
    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
  }

  cleanUpContato() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      email: this.body.email,
      telefone: this.body.telefone,
      userId: this._id,
    };
  }

  async register() {
    this.validaContato();
    if (this.errors.length > 0) return;

    this.contato = await ContatoModel.create(this.body);
  }

  static async findId(id) {
    if (typeof id !== 'string') return;
    const contato = await ContatoModel.findById(id);
    return contato;
  }
  static async delete(id) {
    if (typeof id !== 'string') return;
    const contato = await ContatoModel.findOneAndDelete({ _id: id });
    return contato;
  }
  static async findAll(_id) {
    const contatos = await ContatoModel.find({ userId: _id }).sort({ criadoEm: -1 });
    return contatos;
  }

  async edit(id) {
    if (typeof id !== 'string') return;
    this.validaContato();
    if (this.errors.length > 0) return;
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
  }
}

module.exports = Contato;