import validator from 'validator';

export default class ModalContato {
  constructor(contatos) {
    this.contatos = document.querySelectorAll(contatos);
  }

  init() {
    this.events();
  }

  events() {
    this.contatos.forEach((contato) => {
      const editarBotao = contato.querySelector('[class~="editar"]');
      const listaContatoHTML = this.createListaContatoHTML(contato);
      const contatoObject = this.createContatoObject(listaContatoHTML);

      editarBotao.addEventListener('click', () => {
        this.createModalEdit('modalEdit', contatoObject);
      });
    });
  }


  createModalEdit(modalClasse, contato) {
    const createModal = new bootstrap.Modal(document.querySelector(`[class~=${modalClasse}]`));
    const modal = document.querySelector(`[class~=${modalClasse}]`);
    const contatoFormHTML = this.createContatoFormHTML();

    this.cleanErrorMessages(contatoFormHTML);

    modal.id = `modalContato-${contato.id}`;

    setContatoValues(contatoFormHTML, contato);
    createModal.show();

    contatoFormHTML.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const error = this.validarContato(contatoFormHTML);
      if (!error) {
        createModal.dispose();
        e.target.submit();
      };
    });

    function setContatoValues(contatoFormHTML, contato) {
      contatoFormHTML.form.action = `/contato/edit/${contato.id}`;
      contatoFormHTML.nome.setAttribute('value', contato.nome);
      contatoFormHTML.sobrenome.setAttribute('value', contato.sobrenome);
      contatoFormHTML.telefone.setAttribute('value', contato.telefone);
      contatoFormHTML.email.setAttribute('value', contato.email);
      contatoFormHTML.nome.value = contato.nome;
      contatoFormHTML.sobrenome.value = contato.sobrenome;
      contatoFormHTML.telefone.value = contato.telefone;
      contatoFormHTML.email.value = contato.email;
    }
  }

  createListaContatoHTML(contato) {
    const listaContatoHTML = {
      id: contato.querySelector('.contatoId'),
      nome: contato.querySelector('.contatoNome'),
      sobrenome: contato.querySelector('.contatoSobrenome'),
      telefone: contato.querySelector('.contatoTelefone'),
      email: contato.querySelector('.contatoEmail'),
    };
    return listaContatoHTML;
  }

  createContatoObject(listaContatoHTML) {
    const contatoObject = {
      id: listaContatoHTML.id.textContent,
      nome: listaContatoHTML.nome.textContent,
      sobrenome: listaContatoHTML.sobrenome.textContent,
      telefone: listaContatoHTML.telefone.textContent,
      email: listaContatoHTML.email.textContent,
    };
    return contatoObject;
  }

  createContatoFormHTML() {
    const contatoFormHTML = {
      form: document.querySelector('#modal_editar'),
      nome: document.querySelector('#modal_nome'),
      sobrenome: document.querySelector('#modal_sobrenome'),
      telefone: document.querySelector('#modal_telefone'),
      email: document.querySelector('#modal_email'),
      salvar: document.querySelector('#modal_salvar'),
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
