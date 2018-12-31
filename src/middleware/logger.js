const logger = (store) => (next) => (action) => {
  console.group(action.type) //Queremos que o logger mostre quando uma ação é disparada, e qual será o novo state depois que esta ação for disparada
    console.log('The action: ', action) //Log de qual é ação.
    const returnValue = next(action) //next(action) que será disparado, passando a ação para ele. Isto irá atualizar o state.
    console.log('The new state: ', store.getState()) //E vai nos permitir escrever que o novo state é que conseguirmos escrevendo store.getState
  console.groupEnd() //agrupando tudo no console.
  return returnValue
}

export default logger

/*
Middleware
Nossa última etapa de preparação envolve a configuração das funções de Middleware da nossa aplicação. Assim como na aplicação anterior de afazeres,
vamos criar um middleware de registro que nos ajudará a visualizar as ações e o estado do armazenador conforme interagimos com a nossa aplicação.
Além disso, já que o criador de ação handleInitialData() em src/actions/shared.js retorna uma função, precisaremos instalar o pacote redux-thunk:

obs: Também incluiremos middleware de registro para facilitar a depuração de bugs.

Todo middleware segue este padrão de currying: const logger = (store) => (next) => (action) => {  // ... }
1- À constante logger é atribuída a uma função que recebe o store como seu argumento.
2- Esta função retorna uma outra função, que então recebe next como argumento (que aqui representa o próximo middleware na fila ou a função de despacho).
3- Esta outra função retorna uma terceira função, que recebe action como argumento. Dentro desta terceira função, temos acesso a store, next e action.

É importante observar que o valor do parâmetro next será determinado pela função applyMiddleware. Por quê? Todos middlewares serão chamados na ordem
em que são listados nesta função. No nosso caso, next será a função dispatch porque logger é o último middleware listado na função applyMiddleware.
*/
