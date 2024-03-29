const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
  if (!req.session.user) return res.redirect('/');
  res.render('/', {
    contato: {},
  });
};

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body, req.session.user._id);
    await contato.register();

    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save(() => res.redirect('/'));
      return;
    }

    req.flash('success', 'Seu contato foi cadastrado com sucesso!');
    req.session.save(() => res.redirect(`/`));
    return;
  } catch (error) {
    console.log(error);
    return res.render('404');
  }
};

exports.editIndex = async (req, res) => {
  if (!req.params.id) return res.render('404');

  const contato = await Contato.findId(req.params.id);
  if (!contato) return res.render('404');

  res.render('/', { contato });
};

exports.edit = async (req, res) => {
  try {
    if (!req.params.id) return res.render('404');
    const contato = new Contato(req.body);
    await contato.edit(req.params.id);
    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save(() => res.redirect(`/`));
      return;
    }

    req.flash('success', 'Seu contato foi editado com sucesso!');
    req.session.save(() => res.redirect(`/`));
    return;
  } catch (error) {
    console.log(error);
    res.render('404');
  }
};

exports.delete = async (req, res) => {
  if (!req.params.id) return res.render('404');

  const contato = await Contato.delete(req.params.id);
  if (!contato) return res.render('404');

  req.flash('success', 'Seu contato foi apagado com sucesso');
  req.session.save(() => res.redirect(`/`));
  return;
};
