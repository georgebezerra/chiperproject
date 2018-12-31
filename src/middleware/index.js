/*index.js vai exportar a invocação de applyMiddleware

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

import thunk from 'redux-thunk'           //importando o pacote middleware thunk instalado
import logger from './logger'            //importando o arquivo looger.js criado
import { applyMiddleware } from 'redux' //importando o applyMiddleware do pacote redux.


//A invocação de applyMiddleware será a nossa export default.

export default applyMiddleware(
  thunk,
  logger,
)
