/*Este arquivo vai exportar a nossa invocação para combinar reducers.
Vamos combinar todos estes redutores em um redutor raiz principal, que combinará os resultados das chamadas para o redutor tweets,
o redutor users, e o redutor authedUser em um único objeto para o estado. Lembre-se, precisamos fazer isto porque a função createStore só aceita
um único redutor.

    Reduce root
combineReducers({
  authedUser: authedUser,
  tweets: tweets,
  users: users
});

Configuração de uma barra de carregamento : import { loadingBarReducer } from 'react-redux-loading'
O que faremos aqui é adicionar algumas informações sobre o state atual de carregamento do aplicativo na Store Reducers.
 */
import { combineReducers }   from 'redux'
import authedUser            from './authedUser'
import users                 from './users'
import tweets                from './tweets'

//o pacote react-redux-loading nos permite exportar o loadingBarReducer
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  authedUser,
  users,
  tweets,
  loadingBar: loadingBarReducer, // e isso nos permitirá adicionar a reducer como parte do estado da Store Redux. Obs: No console.log dá para ver o resultado desta configuração
})//Mas se quisermos usar isso no aplicativo, também precisaremos de alguns criadores de ação (shared.js) para podermos disparar a fim de alterar
// o state do loadingBar e precisaremos renderizar um componente, que exibirá a IU da loadingBar.


/*
Reducers
Um redutor descreve como o estado de uma aplicação é modificado. Você frequentemente verá o Operador de Espalhamento de Objetos (...) sendo usado
dentro de um redutor porque um redutor precisa retornar um novo objeto ao invés de alterar o estado antigo. Se você precisar refrescar a memória
quanto ao operador de espalhamento, veja esta aula de ES6 lesson.

Redutores têm a seguinte assinatura: (previousState, action) => newState

Reducers: recebem e tratam as informações para que sejam ou não enviadas à Store.
*/
