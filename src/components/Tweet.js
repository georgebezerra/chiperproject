//Criando o componente Tweet.js para passarmos as IDs dos Tweets e renderizar cada Tweet individualmente.
import React, { Component }        from 'react'
import { connect }                 from 'react-redux' //Convetendo o Tweet em um conteiner.
import { formatTweet, formatDate } from '../utils/helpers'
import { TiArrowBackOutline}       from 'react-icons/ti/index'
import { TiHeartOutline }          from 'react-icons/ti/index'
import { TiHeartFullOutline }      from 'react-icons/ti/index'
import { handleToggleTweet }       from '../actions/tweets'
import { Link, withRouter }        from 'react-router-dom' //Link permitirá clickar nos tweets individualmente
//withRouter permite configurar o replying do cabeçalho do tweet como botão, para ser redirecionado para o tweet que estamos respondendo.

class Tweet extends Component {
  handleLike = (e) => {
    e.preventDefault()

//Depois de ter criado action e a reducer do TOGGLE_TWEET, teremos que lidar com o tweet
    const { dispatch, tweet, authedUser } = this.props

//Disparando a invocação de handleToggleTweet.
//Não precisamos passar um objeto que tem uma propriedade id, o authedUser e o fato de haver curtidas ou não.
   dispatch(handleToggleTweet({
     id: tweet.id, //Podemos passar a ID, que verá de tweet.id,
     hasLiked: tweet.hasLiked, //se há curtidas, que virá de tweet.hasLiked,
     authedUser //e o authedUser, porque é isso que passamos ao componente Tweet como propriedade, no return da linha 98, "authedUser"
   }))
  }
  toParent = (e, id) => {
    e.preventDefault()
    this.props.history.push(`/tweet/${id}`) //configurando, withRouter, que queremos ser redirecionado para a nova ID a que estamos respondendo
    // todo: Redirect to parent Tweet,
  }

  render() {                          console.log(this.props)

     const { tweet } = this.props //passando via props para o Destructuring assignment abaixo.

     if (tweet === null) {
       return <p>This tweet doesn t existd</p>
     } console.log(this.props)

  //Destructuring assignment - todas as constantes virão de tweet que vem de this.props
  const { name, avatar, timestamp, text, hasLiked, likes, replies, id, parent } = tweet

    return (
        <Link to={`/tweet/${id}`} className='tweet'> {/*Link configura para clickar no tweet individualmente, /tweet-id */}
          <img  /*código para renderizar o avatar*/
            src={avatar}
            alt={`Avatar of ${name}`}
            className='avatar'
          />

          <div className='tweet-info'> {/*código para renderizar o carimbo do nome, hora, data e se está respondendo a outro tweet*/}
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            {parent && (
              <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                 Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
            <div className='tweet-icons'>
              <TiArrowBackOutline className='tweet-icon' />
                <span>{replies !== 0 && replies}</span>
                <button className='heart-button' onClick={this.handleLike}>
                  {hasLiked === true
                    ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
                    : <TiHeartOutline className='tweet-icon' />
                  }
                </button>
                <span>{likes !== 0 && likes}</span>
            </div>
          </div>
        </Link>
    )
  }
}
/*Qual state o componente precisa da store redux? Nos parâmetros abaixo passamos ao componente uma propriedade, como segundo argumento.
Observe que dentro do componente Dashboard, estamos passando uma prop id para o componente Tweet:   <Tweet id={id} />
Como estamos fazendo isso? O segundo argumento da função mapStateToProps (ownProps) será um objeto que tem uma propriedade id com este valor:
    mapStateToProps(StoreState, [ownProps]) ->   function mapStateToProps ({authedUser, users, tweets}, { id })

Uma coisa importante a se observar aqui é que mapStateToProps aceita dois argumentos:

a) o estado do armazenador
b) as props que foram passadas para o componente Tweet

Estamos desestruturando ambos argumentos. Estamos extraindo do armazenador:

    os dados authedUser
    os dados de usuários
    os dados de tweets

Então estamos obtendo o id das props passadas para o componente Tweets. Precisamos de ambas porções de dados (que vem do estado do armazenador e
 do componente) para que possamos determinar qual tweet deve ser exibido pelo componente Tweet.
*/
function mapStateToProps ({authedUser, users, tweets}, { id }) {
    const tweet = tweets[id] //Agora podemos passar qualquer coisa ao componente Tweet.
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null//Obtendo informações do tweet pai, para saber se é um tweet novo ou resposta de um anterior

    return {
      authedUser,//E então passaremos o usuário autenticado. Assim, sempre que gostarmos de um tweet ou respondermos a um tweet saberemos quem é o usuário.
      tweet: tweet
       ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet) //Também queremos passar o próprio tweet e o usuário que o criou.
       : null
    }
}
//invocando o connect e passando o mapStateToProps e o componente Tweet para ter acesso ao state Redux.
export default withRouter(connect(mapStateToProps)(Tweet))

//withRouter - empacotando todo o componente para ser Roteado, pois não estava sendo renderizado pelo React Router, isto irá passar nosso
//componente connect, que vai passar ao componente Tweet todas as router props, o que vai nos permitir fazer o this.props.history.push,
//da linha 29
