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
  dispatch({
    type: 'GET_TOPICS_REQUEST',
    loading: 'request'
  })
  axios.get(url, {
      params: postQuery
    })
    .then(function(response) {
      topicList = response.data.data
      console.log(topicList)
      if (response.data.data) {
        dispatch({
          type: 'GET_TOPICS_SUCC',
          list: topicList,
          pageNumb: postQuery.page,
          limit: postQuery.limit,
          tab: postQuery.tab,
          loading: 'success'
        })
      }
    })
    .catch(function(error) {
      console.log(error)
      dispatch({
        type: 'GET_TOPICS_FAIL',
        loading: 'fail'
      })
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
    type: 'LOGIN_USER_REQUEST',
    login: 'request'
  })
  axios.post(url, data)
    .then(function(response) {
      if (response.status === 200) {
        localStorage.setItem('loginname', data.accesstoken)
        localStorage.setItem('username', response.data.loginname)
        dispatch({
          type: 'LOGIN_USER_SUCC',
          login: 'success'
        })
      }
    })
    .catch(function(error) {
      console.log(error)
      dispatch({
        type: 'LOGIN_USER_FAIL',
        login: 'fail'
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
  dispatch({
    type: 'COLLECT_REQUEST',
    collect: 'request'
  })
  axios.post(url, {
      accesstoken: acc,
      topic_id: id
    })
    .then(function(response) {
      if (response.status === 200) {
        dispatch({
          type: 'COLLECT_SUCC',
          collect: 'success'
        })
      }
    })
    .catch(function(error) {
      console.log(error);
      dispatch({
        type: 'COLLECT_FAIL',
        collect: 'fail'
      })
    })

}

//取消收藏
export const cancelCollect = (id, acc) => dispatch => {
  const url = `https://cnodejs.org/api/v1/topic_collect/de_collect`
  dispatch({
    type: 'COLLECT_REQUEST',
    collect: 'request'
  })
  axios.post(url, {
      accesstoken: acc,
      topic_id: id
    })
    .then(function(response) {
      if (response.status === 200) {
        dispatch({
          type: 'COLLECT_SUCC',
          collect: 'success'
        })
      }
    })
    .catch(function(error) {
      console.log(error);
      dispatch({
        type: 'COLLECT_FAIL',
        collect: 'fail'
      })
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
  dispatch({
    type: 'MARK_ALL_REQUEST',
    mark_result: 'request'
  })
  axios.post(url, {
      accesstoken: acc
    })
    .then(function(response) {
      if (response.status === 200) {
        dispatch({
          type: 'MARK_ALL_SUCC',
          mark_result: 'success'
        })
      }
    })
    .catch(function(error) {
      console.log(error)
      dispatch({
        type: 'MARK_ALL_FAIL',
        mark_result: 'fail'
      })
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
  console.log(queryNow)
  dispatch({
    type: 'REPLIE_REQUEST',
    rep_succ: 'request'
  })
  axios.post(url, queryNow)
    .then(function(response) {
      if (response.status === 200) {
        console.log(response)
        dispatch({
          type: 'REPLIE_SUCC',
          rep_succ: 'success'
        })
      }
    })
    .catch(function(error) {
      console.log(error)
      dispatch({
        type: 'REPLIE_FAIL',
        rep_succ: 'fail'
      })
    })
}

//点赞
export const addStar = (acc, reid) => dispatch => {
  const url = `https://cnodejs.org/api/v1/reply/${reid}/ups`
  dispatch({
    type: 'ADD_STAR_REQUEST',
    star: 'request'
  })
  axios.post(url, {
      accesstoken: acc
    })
    .then(function(response) {
      if (response.status === 200) {
        dispatch({
          type: 'ADD_STAR_SUCC',
          star: response.data.action
        })
      }
    })
    .catch(function(error) {
      console.log(error)
      dispatch({
        type: 'ADD_STAR_FAIL',
        star: 'fail'
      })
    })
}

//新建主题
export const createTopic = (query) => dispatch => {
  const url = `https://cnodejs.org/api/v1/topics`
  dispatch({
    type: 'CREATE_TOPIC_REQUEST',
    create: 'request'
  })
  axios.post(url, query)
    .then(function(response) {
      if (response.status === 200) {
        dispatch({
          type: 'CREATE_TOPIC_SUCC',
          create: 'success'
        })
      }
    })
    .catch(function(error) {
      console.log(error)
      dispatch({
        type: 'CREATE_TOPIC_FAIL',
        create: 'fail'
      })
    })
}

//编辑主题
export const updateTopic = (query, topic_id) => dispatch => {
  const url = `https://cnodejs.org/api/v1/topics/update`
  const post_data = {...query,
    topic_id
  }
  console.log(post_data)
  dispatch({
    type: 'UPDATE_TOPIC_REQUEST',
    update: 'request'
  })
  axios.post(url, post_data)
    .then(function(response) {
      if (response.status === 200) {
        dispatch({
          type: 'UPDATE_TOPIC_SUCC',
          update: 'success'
        })
      }
    })
    .catch(function(error) {
      console.log(error)
      dispatch({
        type: 'UPDATE_TOPIC_FAIL',
        update: 'fail'
      })
    })
}