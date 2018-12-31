//importando o método da API para trazer os users e tweets do DB
import { getInitialData } from '../utils/api'

//Importando a Action Creator RECEIVE_USERS
import { receiveUsers } from '../actions/users'

//Importando a Action Creator  RECEIVE_TWEETS
import { receiveTweets } from '../actions/tweets'

//Importando a Action Creator SET_AUTHED_USER
import { setAuthedUser } from '../actions/authedUser'

//Importando 2 criadores de ação para loadingBar aparecer (show) ou não (hide).
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = 'tylermcginnis'

//Função padrão middleware Redux-thunk que retorna uma função de um criador de ação, pois queremos fazer uma solicitação assíncrona dentro data função.
//Agora a pergunta é: onde despachamos este criador de ação?
export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading()) //Antes de invorcarmos a getInitialData, queremos disparar showLoading para exibir a barra de carregamento.
    return getInitialData() //return Promise dos objetos abaixo
      .then(({ users, tweets }) => {
        dispatch(receiveUsers(users)) //Adicionar os objetos users e adiciona-los ao state do Store Redux. Mas primeiro deve-se disparar actions no users.js
        dispatch(receiveTweets(tweets)) //Adicionar os objetos users e adiciona-los ao state do Store Redux. Mas primeiro deve-se disparar actions no tweets.js
        dispatch(setAuthedUser(AUTHED_ID)) //Recebendo o Hard Coding, só para produção
        dispatch(hideLoading())//E após obtermos as informações de getInitialData de atualizar os usuários, os tweets e configurar os usuários autenticados,
      })
  }
}
/*Após ter feito as Actions Creators, o próximo passo é configurar as Reducers para modificar o state com base nestas ações.

Actions: são fontes de informações que são enviadas da aplicação para a Store. São disparadas pelas Action Creators, que são simples funções que,
ao serem executadas, ativam os Reducers.

Determinamos previamente que precisamos obter os dados de users e tweets do nosso banco de dados e enviar estes dados para nosso armazenador,
juntamente com os dados de authedUser, quando a página inicial for carregada.

Também criamos um criador de ação thunk que obtém os dados do banco de dados e então despacha ações para o armazenador, para configurar três
pedaços do estado que temos no nosso armazenador:

users
tweets
authedUser
*/
