import { RECEIVE_USERS } from '../actions/users'

//exportando a reducer users.
export default function users (state = {}, action) { //que vai configurar o default state para um objeto vazio e vai conter uma action
  switch(action.type) { //quando o action.type
    case RECEIVE_USERS : // a case for igual a action RECEIVE_USERS
      return {//Queremos fundir todos os users neste objeto.
        ...state, //return o novo state da parte dos users do nosso estado, terá tudo que estava nela, neste caso, um objeto vazio, state = {}
        ...action.users //assim como todo os users que vamos pegar da action.
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
