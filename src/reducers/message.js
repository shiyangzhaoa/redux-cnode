const initialState = {
	messageNum: 0,
	has_read: [],
	has_not_read: []
}

export default function message(state = initialState, action) {
	switch (action.type) {
		case 'GET_MESSAGE_NUM':
			return ({
				...state,
				messageNum: action.messageNum
			})
		case 'GET_MESSAGE':
			return ({
				...state,
				has_read: action.hasRead,
				has_not_read: action.hasNotRead
			})
		default:
			return state
	}
}