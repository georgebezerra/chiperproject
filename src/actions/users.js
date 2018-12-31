//Action Type de quando recebermos e dispararmos os usuários para atualizar a Store.
export const RECEIVE_USERS = 'RECEIVE_USERS'

//Action Creator para executar o Action Typer.
export function receiveUsers (users) { //Passando users como primeiro argumento, quando a função é chamada.
  return { //return um objeto ou a ação do tipo RECEIVE_USERS
    type: RECEIVE_USERS,
    users,
  }
}
