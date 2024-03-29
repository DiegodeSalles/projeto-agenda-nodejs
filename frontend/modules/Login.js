import validator from 'validator';

export default class Login {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.validate(e);
    });
  }

  validate(e) {
    const el = e.target;
    console.log(el);
    const emailInput = el.querySelector('input[name="email"]');
    const passwordInput = el.querySelector('input[name="password"]');
    let error = false;
    validateEmail();
    validatePassword();

    function validateEmail() {
      if (emailInput.nextSibling.nodeName === 'I') emailInput.nextSibling.remove();
      if (!validator.isEmail(emailInput.value)) {
        const i = createErrorMessage('E-mail inválido!');
        emailInput.after(i);
        error = true;
      }
    }

    function validatePassword() {
      if (passwordInput.nextSibling.nodeName === 'I') passwordInput.nextSibling.remove();
      if (passwordInput.value.length < 3 || passwordInput.value.length > 30) {
        const i = createErrorMessage('A senha precisa ter entre 3 e 30 caracteres');
        passwordInput.after(i);
        error = true;
      }
    }

    function createErrorMessage(msg) {
      const i = document.createElement('i');
      i.innerHTML = msg;
      i.classList.add('text-danger');
      return i;
    }
    if (!error) el.submit();
  }
}
