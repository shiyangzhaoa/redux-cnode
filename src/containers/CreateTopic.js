import React, {
	PropTypes
} from 'react'
import {
	bindActionCreators
} from 'redux'
import {
	connect
} from 'react-redux'
import * as Actions from '../actions'
import {
	Button
} from 'antd'

const style = {
	
}

export class Message extends React.Component {

	componentWillMount = () => {
		const acc = localStorage.getItem("loginname") || ''
		this.props.actions.getMessage(acc)
	}

	markAll = () => {
		const acc = localStorage.getItem("loginname") || ''
		this.props.actions.getMrakAll(acc)
	}

	render() {
		const {
			actions,
			state
		} = this.props
		console.log(actions, state)
		return (
			<div>
				hfgh
			</div>
		);
	}
}

Message.propTypes = {
	actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	state: state
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(Actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Message)