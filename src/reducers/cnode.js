const initialState = {
	topicList: [],
	page: 1,
	limit: 0,
	topic: {},
	tab: '',
	username: '',
	login: '',
	collect: '',
	collections: [],
	userinfo: {},
	isLoading: true,
	userlogin: false,
	mark_result: '',
	rep_succ: '',
	star: '',
	create: ''
}

export default function cnode(state = initialState, action) {
	switch (action.type) {
		case 'GET_TOPICS':
			return ({
				...state,
				topicList: action.list,
				page: action.pageNumb,
				limit: action.limit,
				tab: action.tab,
				isLoading: action.loading
			})
		case 'GET_TOPICS_LOADING':
			return ({
				...state,
				isLoading: action.loading
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
				login: action.end,
				userlogin: action.login
			})
		case 'LOGIN_USER_LOADING':
			return ({
				...state,
				userlogin: action.login
			})
		case 'LOGIN_FAIL':
			return ({
				...state,
				login: action.end,
				userlogin: action.login
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
		case 'COLLECT_REQUEST':
			return ({
				...state,
				collect: action.collect
			})
		case 'COLLECT_FAIL':
			return ({
				...state,
				collect: action.cancelCollect
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
		case 'REPLIE_SUCC':
			return ({
				...state,
				rep_succ: action.rep_succ
			})
		case 'REPLIE_REQUEST':
			return ({
				...state,
				rep_succ: action.rep_succ
			})
		case 'REPLIE_FAIL':
			return ({
				...state,
				rep_succ: action.rep_succ
			})
		case 'ADD_STAR_REQUEST':
			return ({
				...state,
				star: action.star
			})
		case 'ADD_STAR_SUCC':
			return ({
				...state,
				star: action.star
			})
		case 'ADD_STAR_FAIL':
			return ({
				...state,
				star: action.star
			})
		case 'CREATE_TOPIC_REQUEST':
			return ({
				...state,
				create: action.create
			})
		case 'CREATE_TOPIC_SUCC':
			return ({
				...state,
				create: action.create
			})
		case 'CREATE_TOPIC_FAIL':
			return ({
				...state,
				create: action.create
			})
		case 'MARK_ALL_REQUEST':
			return ({
				...state,
				mark_result: action.mark_result
			})
		case 'MARK_ALL_SUCC':
			return ({
				...state,
				mark_result: action.mark_result
			})
		case 'MARK_ALL_FAIL':
			return ({
				...state,
				mark_result: action.mark_result
			})
		case 'UPDATE_TOPIC_REQUEST':
			return ({
				...state,
				create: action.update
			})
		case 'UPDATE_TOPIC_SUCC':
			return ({
				...state,
				create: action.update
			})
		case 'UPDATE_TOPIC_FAIL':
			return ({
				...state,
				create: action.update
			})
		default:
			return state
	}
}