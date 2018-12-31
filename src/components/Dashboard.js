import React, { Component } from 'react'
import { connect }          from 'react-redux' //Convetendo o Dashboard em um conteiner.
import Tweet                from './Tweet'

//Quais dados da store este componente precisará? renderizará os tweets!
class Dashboard extends Component {
  render() {                             //console.log(this.props)
    return (
      <div>
        <h3 className='center'>Your Timeline</h3>
        <ul className='dashboard-list'>
          {this.props.tweetIds.map((id) => (
            <li key={id}>
              { /*<div>TWEET ID: {id}</div>  Renderizando o texto dos Tweets para vermos se obtermos os dados corretos. */}
              <Tweet id={id} /> {/* Renderizamos o Tweet passando uma prop ID */}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
/*
Uma vez que só nos preocupamos com tweets no armazenador, podemos usar desestruturação para passar a porção tweets do estado do armazenador
como parâmetro para a função mapStateToProps().
*/
function mapStateToProps ({ tweets }) { //tweets é a fatia do state na store com que o este componente se importa.
  return {
    tweetIds: Object.keys(tweets) //tweetIds aparecerá como uma propriedade deste container.
      .sort((a,b) => tweets[b].timestamp - tweets[a].timestamp) //assim pegaremos os diferentes IDs dos tweets, para que eles apareçam
  }                                                            // de acordo com o rótumo de tempo.
}

export default connect(mapStateToProps)(Dashboard)

/*
Para criar um container, precisamos usar a função connect(). Lembre-se que a assinatura da função connect se parece assim:
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])

mapStateToProps - Caso este argumento seja especificado, o novo componente vai receber as atualizações do store do React.
Isso significa que a função mapStateToProps será chamada toda vez que o store for atualizado. O resultado de mapStateToProps deve ser um objeto simples,
que será incorporado às props do componente. Se você não quiser receber atualizações do armazenador, passe um argumento null ou undefined no
lugar de mapStateToProps.

Lembre-se que a assinatura da função mapStateToProps é:
    mapStateToProps(state, [ownProps])

1 - state é o estado dentro do armazenador
2 - ownProps são as propriedades que foram passadas para este componente a partir de um componente pai
*/
