import {
  _getUsers,
  _getTweets,
  _saveLikeToggle,
  _saveTweet,
} from './_DATA.js'

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getTweets(),
  ]).then(([users, tweets]) => ({
    users,
    tweets,
  }))
}

//Função para salvar as curtidas no DB, com o coração cheio ou não.
export function saveLikeToggle (info) {
  return _saveLikeToggle(info)
}

//Função para salvar os Tweets no DB.
export function saveTweet (info) {
  return _saveTweet(info)
}
