const initialState = {
	topicList: [],
	page: 1,
	limit: 0,
	topic: {},
	tab: '',
	username: '',
	login: '',
	collect: false,
	cancelCollect: false,
	collections: [],
	userinfo: {}
}

export default function cnode(state = initialState, action) {
	switch (action.type) {
		case 'GET_TOPICS':
			return ({
				...state,
				topicList: action.list,
				page: action.pageNumb,
				limit: action.limit,
				tab: action.tab
			})
		case 'GET_TOPIC_DETAIL':
			return ({
				...state,
				topic: action.topic
			})
		case 'LOGIN_USER':
			return ({
				...state,
				loginname: action.name,
				login: action.end
			})
		case 'LOGIN_FAIL':
			return ({
				...state,
				login: action.end
			})
		case 'SIGN_OUT':
			return ({
				...state,
				login: action.status,
				loginname: ''
			})
		case 'COLLECT_SUCC':
			return ({
				...state,
				collect: action.collect
			})
		case 'COLLECT_CANCEL':
			return ({
				...state,
				cancelCollect: action.cancelCollect
			})
		case 'GET_COLLECTION':
			return ({
				...state,
				collections: action.collection
			})
		case 'GET_USER_INFO':
			return ({
				...state,
				userinfo: action.userinfo
			})
		default:
			return state
	}
}