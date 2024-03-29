const Contato = require('../models/ContatoModel');

exports.index = async (req, res) => {
  if (req.session.user) {
    const contatos = await Contato.findAll(req.session.user._id);
    return res.render('index', { contatos });
  }
  res.render('index');
};
