import validator from 'validator';

export default class ModalRegister {
  constructor(formRegistrar, modalRegistrar, btnRegistrar) {
    this.formRegistrar = document.querySelector(formRegistrar);
    this.modalRegistrar = document.querySelector(modalRegistrar);
    this.btnRegistrar = document.querySelector(btnRegistrar);
  }

  init() {
    this.events();
  }

  events() {
    if (this.btnRegistrar) {
      this.btnRegistrar.addEventListener('click', () => {
        this.createRegister();
      });
    }
  }

  createRegister() {
    const createModal = new bootstrap.Modal(document.querySelector('#modalRegister'));
    createModal.show();
    this.formRegistrar.addEventListener('submit', (e) => {
      e.preventDefault();
      const contatoFormHTML = this.createContatoFormHTML();
      const error = this.validarContato(contatoFormHTML);
      if (!error) {
        createModal.dispose();
        e.target.submit();
      }
    });
  }

  createContatoFormHTML() {
    const contatoFormHTML = {
      form: document.querySelector('.form-register'),
      nome: document.querySelector('#register_nome'),
      sobrenome: document.querySelector('#register_sobrenome'),
      telefone: document.querySelector('#register_telefone'),
      email: document.querySelector('#register_email'),
      salvar: document.querySelector('#register_salvar'),
    };
    return contatoFormHTML;
  }

  validarContato(contatoFormHTML) {
    let error = false;
    this.cleanErrorMessages(contatoFormHTML);
    if (!contatoFormHTML.nome.value) {
      const p = createErrorMessage('O nome não pode estar vazio');
      contatoFormHTML.nome.after(p);
      error = true;
    }

    if (!contatoFormHTML.telefone.value && !contatoFormHTML.email.value) {
      let p = createErrorMessage('O contato precisa de um nome ou telefone');
      contatoFormHTML.telefone.after(p);
      p = createErrorMessage('O contato precisa de um nome ou telefone');
      contatoFormHTML.email.after(p);
      error = true;
    }

    if (contatoFormHTML.email.value && !validator.isEmail(contatoFormHTML.email.value)) {
      const p = createErrorMessage('E-mail inválido');
      contatoFormHTML.email.after(p);
      error = true;
    }

    function createErrorMessage(msg) {
      const p = document.createElement('p');
      p.innerHTML = msg;
      p.classList.add('text-danger');
      return p;
    }

    return error;
  }

  cleanErrorMessages(contatoFormHTML) {
    if (contatoFormHTML.nome.nextSibling.nodeName === 'P') contatoFormHTML.nome.nextSibling.remove();
    if (contatoFormHTML.telefone.nextSibling.nodeName === 'P') contatoFormHTML.telefone.nextSibling.remove();
    if (contatoFormHTML.email.nextSibling.nodeName === 'P') contatoFormHTML.email.nextSibling.remove();
    return;
  }
}
