import {
	combineReducers
} from 'redux'
import cnode from './cnode'
import message from './message'

const rootReducer = combineReducers({
	cnode,
	message
})

export default rootReducer