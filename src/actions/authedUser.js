//Action Type de autenticação de usuário para atualizar a Store.
export const SET_AUTHED_USER = 'SET_AUTHED_USER'

//Action Creator para executar a Action Typer.
export function setAuthedUser (id) { //Passando id como primeiro argumento, quando a função é chamada.
  return { //return um objeto ou a ação do tipo 'SET_AUTHED_USER'
    type: SET_AUTHED_USER,
    id,
  }
}
