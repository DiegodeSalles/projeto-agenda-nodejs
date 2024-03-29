import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Login from './modules/Login';
import ModalContato from './modules/ModalContato';
import ModalRegister from './modules/ModalRegister';
import './assets/css/style.css';

const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');
const modalContato = new ModalContato('[class~="contatoAgenda"]');
const modalRegister = new ModalRegister('.form-register', '#modalRegister', '#btnRegistrar');

login.init();
cadastro.init();
modalContato.init();
modalRegister.init();
