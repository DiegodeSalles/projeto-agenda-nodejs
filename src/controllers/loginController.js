const Login = require('../models/LoginModel');

exports.index = (req, res) => {
  if (req.session.user) return res.redirect('/');
  return res.render('/');
};

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.register();
    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(function () {
        return res.redirect('/');
      });
      return;
    }
    req.flash('success', 'Seu usuário foi criado com sucesso!');
    req.session.save(async () => {
      await login.login();
      req.session.user = login.user;
      req.session.save(function () {
        return res.redirect('/');
      });
    });
  } catch (error) {
    res.render('404');
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.login();

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(function () {
        return res.redirect('/');
      });
      return;
    }

    req.flash('success', 'Logado com sucesso.');
    req.session.user = login.user;
    req.session.save(function () {
      return res.redirect('/');
    });
  } catch (error) {
    res.render('404');
    console.log(error);
  }
};

exports.logout = function (req, res) {
  req.session.destroy();
  res.redirect('/');
};
