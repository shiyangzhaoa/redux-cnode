import axios from 'axios'


//获取主体列表
let defaultQuery = {
  page: 1,
  limit: 20,
  tab: 'all'
}
export const getTopics = (query = defaultQuery) => dispatch => {
  const url = "https://cnodejs.org/api/v1/topics"
  let topicList = []
  let postQuery = {...defaultQuery,
    ...query
  }
  console.log(postQuery)
  axios.get(url, {
      params: postQuery
    })
    .then(function(response) {
      topicList = response.data.data
      dispatch({
        type: 'GET_TOPICS',
        list: topicList,
        pageNumb: postQuery.page,
        limit: postQuery.limit,
        tab: postQuery.tab
      })
    })
    .catch(function(error) {
      console.log(error)
    })

}

//通过id访问主题详情
export const topicDetail = (id) => dispatch => {
  const url = `https://cnodejs.org/api/v1/topic/${id}`
  const accesstoken = localStorage.getItem("loginname") || ''
  let topic = {}
  axios.get(url, {
      params: {
        accesstoken: accesstoken
      }
    })
    .then(function(response) {
      topic = response.data.data
      dispatch({
        type: 'GET_TOPIC_DETAIL',
        topic: topic
      })
    })
    .catch(function(error) {
      console.log(error)
    })

}

//登陆
export const userLogin = (data) => dispatch => {
  const url = 'https://cnodejs.org/api/v1/accesstoken'
    //console.log(data)
  axios.post(url, data)
    .then(function(response) {
      if (response.status === 200) {
        localStorage.setItem('loginname', data.accesstoken)
        dispatch({
          type: 'LOGIN_USER',
          name: response.data.loginname,
          end: 'success'
        })
      }
    })
    .catch(function(error) {
      console.log(error)
      dispatch({
        type: 'LOGIN_FAIL',
        end: 'fail'
      })
    })
}

//登出
export const signOut = () => ({
  type: 'SIGN_OUT',
  status: 'leave'
})


//收藏主体（）
export const collect = (id, acc) => dispatch => {
  const url = `https://cnodejs.org/api/v1/topic_collect/collect`
  axios.post(url, {
      accesstoken: acc,
      topic_id: id
    })
    .then(function(response) {
      if (response.status === 200) {
        dispatch({
          type: 'COLLECT_SUCC',
          collect: 'collect'
        })
      }
    })
    .catch(function(error) {
      console.log(error);
    })

}

//取消收藏
export const cancelCollect = (id, acc) => dispatch => {
  const url = `https://cnodejs.org/api/v1/topic_collect/de_collect`
  axios.post(url, {
      accesstoken: acc,
      topic_id: id
    })
    .then(function(response) {
      if (response.status === 200) {
        dispatch({
          type: 'COLLECT_CANCEL',
          cancelCollect: 'noCollect'
        })
      }
    })
    .catch(function(error) {
      console.log(error);
    })

}

//获取用户收藏列表
export const getCollection = (username) => dispatch => {
  const url = `https://cnodejs.org/api/v1/topic_collect/${username}`
  axios.get(url)
    .then(function(response) {
      const collection = response.data
      dispatch({
        type: 'GET_COLLECTION',
        collection: collection.data
      })
    })
    .catch(function(error) {
      console.log(error)
    })

}

//通过loginname获取用户信息
export const getUserInfo = (loginname) => dispatch => {
  const url = `https://cnodejs.org/api/v1/user/${loginname}`
  axios.get(url)
    .then(function(response) {
      if (response.status === 200) {
        dispatch({
          type: 'GET_USER_INFO',
          userinfo: response.data.data
        })
      }
    })
    .catch(function(error) {
      console.log(error)
    })

}