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
	message
} from 'antd'
import {
	Link
} from 'react-router'

const style = {
	content: {
		width: '90%',
		backgroundColor: '#fff',
		margin: '20px auto',
		borderRadius: '8px 8px 0 0',
		boxShadow: '5px 5px 5px #ccc'
	},
	title: {
		backgroundColor: '#f6f6f6',
		borderRadius: '8px 8px 0 0',
		width: '100%',
		height: '40px',
		fontSize: '14px',
		lineHeight: '40px',
		paddingLeft: '5px'
	},
	no: {
		padding: '10px',
		height: '60px',
		fontSize: '14px'
	},
	mark: {
		color: '#57c5f7',
		marginLeft: '20px',
		cursor: 'pointer'
	},
	has_read: {
		padding: '10px',
		borderTop: '1px solid #f0f0f0',
		fontSize: '14px'
	}
}

export class Message extends React.Component {

	componentWillMount = () => {
		const acc = localStorage.getItem("loginname") || ''
		this.props.actions.getMessage(acc)
	}

	componentWillReceiveProps = (nextProps) => {
		const markNow = this.props.state.cnode.mark_result
		const markNext = nextProps.state.cnode.mark_result
		if (markNow !== markNext && markNext === 'success') {
			message.success('已全部标记为已读')
			const acc = localStorage.getItem("loginname") || ''
			this.props.actions.getMessage(acc)
		}
		if (markNow !== markNext && markNext === 'fail') {
			message.error('标记出错')
		}
	}

	markAll = () => {
		const acc = localStorage.getItem("loginname") || ''
		this.props.actions.getMrakAll(acc)
	}

	render() {
		const {
			state
		} = this.props
		const messages = state.message
		console.log(this.props)
		const hasNotReads = messages.has_not_read.map((value) => {
			return (
				value.type === 'at' ?
				<div style={style.has_read} key={value.reply.id}><Link to={`/user/${value.author.loginname}`}>{value.author.loginname}</Link>在话题<Link to={`/topic/${value.topic.id}`}>{value.topic.title}</Link>中{value.type.replace('at', '@')}了你</div> : <div style={style.has_read} key={value.reply.id}><Link to={`/user/${value.author.loginname}`}>{value.author.loginname}</Link>{value.type.replace('at', '@').replace('reply', '回复')}了你的话题<Link to={`/topic/${value.topic.id}`}>{value.topic.title}</Link></div>
			)
		})
		const hasReads = messages.has_read.map((value) => {
			return (
				value.type === 'at' ?
				<div style={style.has_read} key={value.reply.id}><Link to={`/user/${value.author.loginname}`}>{value.author.loginname}</Link>在话题<Link to={`/topic/${value.topic.id}`}>{value.topic.title}</Link>中{value.type.replace('at', '@')}了你</div> : <div style={style.has_read} key={value.reply.id}><Link to={`/user/${value.author.loginname}`}>{value.author.loginname}</Link>{value.type.replace('at', '@').replace('reply', '回复')}了你的话题<Link to={`/topic/${value.topic.id}`}>{value.topic.title}</Link></div>
			)
		})
		return (
			<div>
				<div style={style.content}>
					<p style={style.title}><Link to={`/`}>主页</Link>/新消息
						{messages.has_not_read.length===0 ? '' : <span style={style.mark} type="primary" onClick={this.markAll}>标记全部已读</span>}
					</p>
						{messages.has_not_read.length===0 ? <div style={style.no}>无消息</div> : <div>{hasNotReads}</div>}
					</div>
					<div style={style.content}>
						<p style={style.title}>过往消息</p>
						{messages.has_read.length===0 ? <div style={style.no}>无消息</div> : <div>{hasReads}</div>}
					</div>
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