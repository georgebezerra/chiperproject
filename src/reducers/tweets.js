import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET } from '../actions/tweets'

//exportando a reducer tweets.
export default function tweets (state = {}, action) { //que vai configurar o default state para um objeto vazio e vai conter uma action
  switch(action.type) { //quando o action.type
    case RECEIVE_TWEETS : // a case for igual a action RECEIVE_TWEETS. Recebemos os tweets
      return { //Queremos fundir todos os tweets neste objeto.
        ...state, //return o novo state da parte dos users do nosso estado, terá tudo que estava nela, neste caso, um objeto vazio, state = {}
        ...action.tweets //assim como todo os tweets que vamos pegar da action.
      }

      /*Adicionando a case reduce TOGGLE_TWEET, após ter criado a action TOGGLE_TWEET, que está sendo importada na linha 1.

        Como alterar o formato da parte tweets (store) do state = {} ?
          Analizando o console, verificamos que cada tweet tem propriedades específicas.
          Podemos rastrear os tipos de curtidas com o array likes (vi no console), se o usuário curte um tweet pela primeira vez, o ID dele será
          colocado no array likes. Mas se ele deixar de curtir, removeremos o nome do usuário do array likes.
      */
  case TOGGLE_TWEET :
   return {  //Espalhamos os tweets antigos no state, pois não queremos mudar o state diretamente. Então retornamos um novo objeto e espalharemos
    ...state,  // os tweets anteriores nele.
      [action.id] : { //Mas o que desejamos é o tweet com a ID do que estamos passando para action.id, que precisará ser um novo objeto.
      ...state[action.id], //Pegando as propriedades do objeto e as espalharemos neste novo objeto.
        likes: action.hasLiked === true //Mas queremos que este array likes,
          ? state[action.id].likes.filter((uid) => uid !== action.authedUser) //remova o nome do usuário
          : state[action.id].likes.concat([action.authedUser]) //ou o adicione, a partir da curtida.
      }
  }
  //Sempre que adicionarmos um novo tweet, nós o adicionaremos ao array tweets, na qual está a parte tweet do state, que tecnicamente é um Objeto
      case ADD_TWEET :
        const { tweet } = action

//Mas também, caso o tweet seja resposta de um outro, pegar o novo tweet e espalhando as propriedades antigas no novo tweet,
        let replyingTo = {} //Concatenando o array replies com a nova resposta que acabamos de criar e espalhando o Objeto no array tweets
        if (tweet.replyingTo !== null) {
          replyingTo = {
            [tweet.replyingTo] : {
              ...state[tweet.replyingTo],
            replies: state[tweet.replyingTo].replies.concat([tweet.id])
            }
          }
        }
        return { // 1 - Sempre que adicionarmos um novo tweet
          ...state,
          [action.tweet.id]: action.tweet, // 3 - na qual está a parte tweet do state, que tecnicamente é um Objeto
          ...replyingTo, // 2 - nós o adicionaremos ao array tweets,
        }

      default : //retornando o state default quando nenhuma case acima, for equivalente.
         return state

  }
}

/*
Reducers
Um redutor descreve como o estado de uma aplicação é modificado. Você frequentemente verá o Operador de Espalhamento de Objetos (...) sendo usado
dentro de um redutor porque um redutor precisa retornar um novo objeto ao invés de alterar o estado antigo. Se você precisar refrescar a memória
quanto ao operador de espalhamento, veja esta aula de ES6 lesson.

Redutores têm a seguinte assinatura: (previousState, action) => newState

Reducers: recebem e tratam as informações para que sejam ou não enviadas à Store.
*/
