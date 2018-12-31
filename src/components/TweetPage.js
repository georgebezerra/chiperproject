import React, { Component } from 'react'
import { connect }          from 'react-redux' //Convertendo TweetPage em um conteiner.
import Tweet                from './Tweet'
import NewTweet             from './NewTweet'

 class TweetPage extends Component {
  render() {                                      console.log(this.props)

    const { id, replies } = this.props

    return (
      <div>
        <Tweet id={id} /> {/*Renderizando o Tweet passando o ID*/}

        <NewTweet id={id} />  {/*Renderizando o NewTweet passando o ID para responder*/}
        {replies.length !== 0 && <h3 className='center'>Replies</h3>}
        <ul>
          {replies.map((replyId) => (
            <li key={replyId}>
              <Tweet id={replyId}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
 function mapStateToProps ({ authedUser, tweets, users }, props) {
  const { id } = props.match.params //Pegando a ID do comonente ou do tweet que vamos renderizar.
   return {  //Dados que queremos passar para o componente:
    id,      //que será o ID do tweet que desejamos renderizar.
    replies: !tweets[id] //e qualquer informação de resposta. Se não existe um tweet com esta ID
      ? [] //o array será vazio
      : tweets[id].replies.sort((a,b,) => tweets[b].timestamp - tweets[a].timestamp) //senão, será um
  }//tweet individual, que terá um propriedade reply, que é um array. Por isso o sort, pois queremos ondená-los cronologicamente.
}

export default connect(mapStateToProps)(TweetPage)
