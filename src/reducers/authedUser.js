import { SET_AUTHED_USER } from '../actions/authedUser'

//exportando a reducer authedUser.
export default function authedUser (state = null, action) { //default state para um objeto null, quando esta função é usada, quando o state é indefinido, pois como será a primeira vez que será usada e vai conter uma action
  switch(action.type) { //quando o action.type
    case SET_AUTHED_USER : // a case for igual a action SET_AUTHED_USER. Recebemos os tweets
        return action.id
      default : //retornando o state default quando nenhuma case acima, for equivalente.
         return state

  }
}

/*
Reducers
Um redutor descreve como o estado de uma aplicação é modificado. Você frequentemente verá o Operador de Espalhamento de Objetos (...) sendo usado
dentro de um redutor porque um redutor precisa retornar um novo objeto ao invés de alterar o estado antigo. Se você precisar refrescar a memória
quanto ao operador de espalhamento, veja esta aula de ES6 lesson.

Redutores têm a seguinte assinatura:   (previousState, action) => newState

Reducers: recebem e tratam as informações para que sejam ou não enviadas à Store.
*/
