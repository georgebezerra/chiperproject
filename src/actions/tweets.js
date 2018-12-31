//importando a função para salvar as curtidas no DB, com o coração cheio ou não
import { saveLikeToggle } from '../utils/api'

//importando a função para salvar o novo tweet no DB.
import { saveTweet } from '../utils/api'

//Exibir a barra de carregamento sempre que salvarmos ou adicionarmos um tweet à Store
import { showLoading, hideLoading } from 'react-redux-loading'

//Action Type de quando recebermos e dispararmos os tweets para atualizar a Store.
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'

//Action Type de quando curtimos os tweets, com o coração cheio ou não,  para atualizar a Store.
export const TOGGLE_TWEET   = 'TOGGLE_TWEET'

//Definindo o tipo de evento que ocorrerá quando adicionarmos um novo tweet.
export const ADD_TWEET = 'ADD_TWEET'

//Action Creator para executar a Action Typer 'RECEIVE_TWEETS'.
export function receiveTweets (tweets) { //Passando tweets como primeiro argumento, quando a função é chamada.
  return { //return um objeto ou a ação do tipo RECEIVE_TWEETS
     type: RECEIVE_TWEETS,
     tweets,
  }
}

//Action Creator para executar a Action Typer de curtir ou não com o coração, para atualizar a Store.
function toggleTweet ( {id, authedUser, hasLiked }) { //pegando um objeto que tem esse 3 parâmetros.
   return { //retorna um objeto ou uma ação. E passamos os argumetos abaixo.
     type: TOGGLE_TWEET,
     id,
     authedUser,
     hasLiked
   }
}

//Action creator para executar ADD_TWEET
function addTweet (tweet) {
    return {
      type: ADD_TWEET, //Após configurar a action creator, o próximo passo será descobrir como atualizar o state a partir da ação especifica.
      tweet,
    }
}

//Action creator assíncrono (AJAX) para o addTweet
export function handleAddTweet (text, replyingTo) {
  return (dispatch, getState) => {//O bom de retorna uma função com o middleware Redux-Thunk, é que também será passada uma função getState,
   const { authedUser } = getState()// que podemos invocar para obter o state atual da Store. Podemos obter authedUser do state invocando getState.

    dispatch(showLoading()) //Antes da solicitação assicrona vamos exibir a barra de carregamento.

   //Depois podemos chamar saveTweet, passando:
   return saveTweet({
     text, //texto
     author : authedUser, //autor
     replyingTo //e se o tweet for resposta de outro tweet
   })
   .then((tweet) => dispatch(addTweet(tweet))) //Estando tudo resolvido, é passar o tweet que vamos obter e disparar a action creator addTweet.
   .then(() => dispatch(hideLoading())) //Depois disparar a action creator hideLoading.
 }
}

// Após a configuração do toggleTweet, abaixo temos action creator assíncrono (AJAX) que será responsável por invocar a função saveLikeToggle e
// salvar no DB.
//E disparar toggleTweet para salvar as informações no DB.
// O proximo passo é criar uma Reduce para decidirmos como o state da Store Redux mudará, a partir da ação toggleTweet.
export function handleToggleTweet(info) { //pegará as informações do tweet
  return (dispatch) => { //Como teremos uma solicitação AJAX aqui dentro, return uma arrow function para podermos dispara sempre que quisermos.
    dispatch(toggleTweet(info)) //info - terá id, authedUser e hasLiked. Perceba que aqui estamos usando "ATUALIZAÇÃO OTIMISTAS"

  return saveLikeToggle(info)
    .catch((e) => { //se houver erro
       console.warn('Erro no handleToggleTweet: ', e)
       dispatch(toggleTweet(info))
       alert('The was an error liking the tweet. Try again. ')
    })
  }
}
