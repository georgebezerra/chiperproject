import React, { Component } from 'react'
import { connect }          from 'react-redux' //Convetendo o NewTweet em um conteiner.
import { handleAddTweet }   from '../actions/tweets'
import { Redirect }         from 'react-router-dom'

/*                  IMPORTANTISSÍMO
O que acontece quando alguém clica em “Publicar” para adicionar um novo tweet? O componente Novo Tweet precisará se comunicar como o armazenador.
Nós nos comunicamos com o armazenador ao despacharmos ações. dispatch é um método do armazenador. Isto significa que o componente Novo Tweet
precisa ser connect()ado ao Redux. Uma vez que um componente estiver conectado ao armazenador, ele precisará despachar (dispatch) suas props.
 */
//Este será um componente controlado, state do React ao invés do Redux, pois neste caso, é mais fácil para colocar esta forma de state dentro do Redux.
//Critério: o state deste componente não está sendo compartilhado com outro componente, nem precisamos passá-lo como propriedade ou camada.
class NewTweet extends Component {
  state = {
    text: '', //Perceba que com o componente controlado, quando não há texto, o botão de envio fica desabilitado.
    toHome: false,
  }

  //Método para atualizar o state
  handleChange = (e) => {
    const text = e.target.value
     this.setState(() => ({
      text
    }))
  }

  //Método para submit
  handleSubmit = (e) => {
    e.preventDefault()

     const { text }         = this.state
     const { dispatch, id } = this.props

     dispatch(handleAddTweet(text, id))

     // todo: Add Tweet to Store
     console.log('New Tweet: ', text)

     this.setState(() => ({
      text: '',
      toHome: id ? false : true,
    }))
  }
  render() {
    const { text, toHome } = this.state

//toHome: Redirect to / if submitted  - Quando o formulário for enviado ou o novo tweet for enviado, nos redirecione para "/".

     if (toHome === true) {
       return <Redirect to ='/' />
     }

     const tweetLeft = 280 - text.length

     return (
      <div>
        <h3 className='center'>Compose new Tweet</h3>
        <form className='new-tweet' onSubmit={this.handleSubmit}>
          <textarea
            placeholder="What's happening?"
            value={text}
            onChange={this.handleChange}
            className='textarea'
            maxLength={280}
          />
          {tweetLeft <= 100 && (
            <div className='tweet-length'>
              {tweetLeft}
            </div>
          )}
          <button
            className='btn'
            type='submit'
            disabled={text === ''}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}
 export default connect()(NewTweet)
