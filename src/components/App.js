import React, { Component, Fragment }    from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect }                       from 'react-redux'        //Convetendo o App em um conteiner.
import { handleInitialData }             from '../actions/shared' //Impotando o thunk que irá despachar os dados do store
import Dashboard                         from './Dashboard'
import LoadingBar                        from 'react-redux-loading'
import NewTweet                          from './NewTweet'
import TweetPage                         from './TweetPage'
import Nav                               from './Nav'


class App extends Component {
  componentDidMount() { //Quando o componente App subir, disparemos a invocação do criado de ação handleInitialData.
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
{/*Normalmente, criaria-se uma DIV aqui, mas isso adicionaria outro DIV à DOM. Para não fazer isso, usa-se o Fragment, que permite passar um único
  filho, para o component router de React Router, mas que não vai adicionar outros elementos à DOM.  */}
        <Fragment>{/*Se não configurar este pacote, dará erro, porque precisamos passar um único elemento filho, como filho para Route.*/}
          <LoadingBar />{/*O que não é o caso neste momento, pois estamos passando a barra de carregamento e uma DIV*/}
              <div className='container'>
                <Nav />
                  { this.props.loading === true
                    ? null
                    : <div>
                        <Route path='/' exact    component={Dashboard} />
                        <Route path='/tweet/:id' component={TweetPage} />
                        <Route path='/new'       component={NewTweet}  />
                      </div> }
                </div>
        </Fragment>
      </Router>
    )
  }
}
/*<TweetPage match={{params: {id: '8xf0y6ziyjabvozdd253nd' }}} /> } Pagando o ID de um tweet específico.*/
//Obtendo dados da store
function mapStateToProps ({ authedUser }) {
  return { //os dados que passaremos para o componente
    loading: authedUser === null
  }
}

export default connect (mapStateToProps)(App)

/*
import React, { Component }  from 'react'
import { connect }           from 'react-redux'        //Convetendo o App em um conteiner.
import { handleInitialData } from '../actions/shared' //Impotando o thunk que irá despachar os dados do store
import Dashboard             from './Dashboard'


class App extends Component {
  componentDidMount() { //Quando o componente App subir, disparemos a invocação do criado de ação handleInitialData.
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <div>
          <Dashboard />

      </div>
    )
  }
}

//Para obtermos acesso à dispatch, precisamos conectar o componente App. Obs: Após isso, veja no console se funcinou.
export default connect()(App)
//Perceba que não precisamos de nada do state, então deixaremos a primeira invocação em branco.

/*
Para criar um container, precisamos usar a função connect(). Lembre-se que a assinatura da função connect se parece assim:
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])

Usar a função connect() transforma um componente em um container. Containers podem ler o estado do armazenador e despachar ações.
Leia mais sobre nossa capacidade de customizar a interação do nosso container com o armazenador na documentação da API react-redux .
Certifique-se de passar pelos excelentes exemplos que são fornecidos na documentação associada para obter um entendimento mais profundo do Redux:

https://github.com/reduxjs/react-redux/blob/master/docs/api.md
*/
