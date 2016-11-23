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
  dispatch({
    type: 'GET_TOPICS_LOADING',
    loading: true
  })
  axios.get(url, {
      params: postQuery
    })
    .then(function(response) {
      topicList = response.data.data
      if (response.data.data) {
        dispatch({
          type: 'GET_TOPICS',
          list: topicList,
          pageNumb: postQuery.page,
          limit: postQuery.limit,
          tab: postQuery.tab,
          loading: false
        })
      }
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
  dispatch({
    type: 'LOGIN_USER_LOADING',
    login: true
  })
  axios.post(url, data)
    .then(function(response) {
      if (response.status === 200) {
        localStorage.setItem('loginname', data.accesstoken)
        dispatch({
          type: 'LOGIN_USER',
          name: response.data.loginname,
          end: 'success',
          login: false
        })
      }
    })
    .catch(function(error) {
      console.log(error)
      dispatch({
        type: 'LOGIN_FAIL',
        end: 'fail',
        login: false
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
  //获取未读消息数目
export const getMessageNum = (acc) => dispatch => {
  const url = `https://cnodejs.org/api/v1/message/count`
  axios.get(url, {
      params: {
        accesstoken: acc
      }
    })
    .then(function(response) {
      if (response.status === 200) {
        dispatch({
          type: 'GET_MESSAGE_NUM',
          messageNum: response.data.data
        })
      }
    })
    .catch(function(error) {
      console.log(error)
    })
}

//获取已读和未读消息
export const getMessage = (acc) => dispatch => {
  const url = `https://cnodejs.org/api/v1/messages`
  axios.get(url, {
      params: {
        accesstoken: acc
      }
    })
    .then(function(response) {
      const messages = response.data.data
      if (response.status === 200) {
        dispatch({
          type: 'GET_MESSAGE',
          hasRead: messages.has_read_messages,
          hasNotRead: messages.hasnot_read_messages
        })
      }
    })
    .catch(function(error) {
      console.log(error)
    })
}

//标记消息全部已读
export const getMrakAll = (acc) => dispatch => {
  const url = `https://cnodejs.org/api/v1/message/mark_all`
  axios.post(url, {
      accesstoken: acc
    })
    .then(function(response) {
      if (response.status === 200) {
        dispatch({
          type: 'MARK_ALL'
        })
      }
    })
    .catch(function(error) {
      console.log(error)
    })
}

//提交评论
let defaultRep = {
  id: '',
  accesstoken: '',
  content: ''
}
export const addReplies = (query =
  defaultRep) => dispatch => {
  const url = `https://cnodejs.org/api/v1/topic/${query.id}/replies`
  const queryNow = {
    ...defaultRep,
    ...query
  }
  axios.post(url, queryNow)
    .then(function(response) {
      console.log(response)
      if (response.status === 200) {
        dispatch({
          type: 'REPLIE_SUCC',
          rep_succ: 'success'
        })
      }
    })
    .catch(function(error) {
      console.log(error)
    })
}