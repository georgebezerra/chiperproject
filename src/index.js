import React           from 'react'
import ReactDOM        from 'react-dom'
import                      './index.css'
import App             from './components/App'
import { createStore } from 'redux'
import { Provider }    from 'react-redux'
import reducer         from './reducers'
import middleware      from './middleware' //Isto irá dizer "Ok, importe a export default vinda do arquivo index.js na pasta middleware."
                                          //Temos que garantir que a nossa Store está ciente do pacote middleware instalado e o (logger) criado.

/* Aplicações Redux têm um único armazenador. Precisamos passar o redutor raiz para nossa função createStore() para que o armazenador saiba quais
porções do estado ele deve ter. O objetivo de se criar um armazenador é permitir que componentes sejam capazes de acessá-lo, sem que tenham que
repassar os dados através de múltiplos componentes.*/
const  store = createStore(reducer, middleware) //middleware como segundo argumento, quando o aplicativo carregar buscaremos os dados iniciais
                                               // de que o aplicativo precisa.

/*Empacotar o componente principal do aplicativo dentro do componente Provider, para passarmos a Store para ele.
O componente Provider (que vem do pacote react-redux) permite que todos componentes acessem o armazenador através da função connect().

Garantindo que passamos a Store para o Provider: <Provider store={store}>  */
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root')
)
