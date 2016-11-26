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
	Button,
	Select,
	Input,
	Mention,
	message
} from 'antd'
import {
	Awesome
} from '../components/Awesome'
import {
	browserHistory,
	Link
} from 'react-router'

const Option = Select.Option
const {
	toString
} = Mention

const style = {
	body: {
		width: '90%',
		backgroundColor: '#fff',
		margin: '10px auto',
		borderRadius: '8px'
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
	content: {
		padding: '10px',
		borderTop: '1px solid #e5e5e5'
	},
	there: {
		color: '#999'
	},
	input_title: {
		width: '95%',
		margin: '0 auto 15px'
	},
	submit: {
		marginTop: '30px'
	}
}

export class Message extends React.Component {

	state = {
		select: '',
		title: '',
		content: ''
	}

	componentWillMount() {
		const topicId = this.props.routeParams.topicId
		if (topicId) {
			this.props.actions.topicDetail(topicId)
		}
	}

	componentWillReceiveProps = (nextProps) => {
		const topicId = this.props.routeParams.topicId
		const cnodeNow = this.props.state.cnode
		const cnodeNext = nextProps.state.cnode
		const createNow = cnodeNow.create
		const createNext = cnodeNext.create
		if (createNow !== createNext && createNext === 'success') {
			message.success(`${topicId ? '更新' : '编辑'}成功`)
			browserHistory.push('/')
		}
		if (createNow !== createNext && createNext === 'fail') {
			message.error(`${topicId ? '更新失败' : '创建失败（一天只能创建七个主题）'}`)
		}
	}

	handleSlecet = (value) => {
		this.setState({
			select: value
		})
	}
	handleInput = (e) => {
		let title = e.target.value
		this.setState({
			title: title
		})
	}
	handleContent = (content) => {
		this.setState({
			content: toString(content)
		})
	}

	handleSubmit = () => {
		const acc = localStorage.getItem("loginname") || ''
		const topicId = this.props.routeParams.topicId
		const title = this.state.title || this.props.state.cnode.topic.title
		const tab = this.state.select || this.props.state.cnode.topic.tab
		const content = this.state.content || this.props.state.cnode.topic.content
		let data = {
			accesstoken: acc,
			title: title,
			tab: tab,
			content: content
		}
		if (!topicId) {
			this.props.actions.createTopic(data)
		} else {
			this.props.actions.updateTopic(data, topicId)
		}

	}

	render() {
		const {
			state
		} = this.props
		const topicId = this.props.routeParams.topicId
		return (
			<div style={style.body}>
				<p style={style.title}><Link to={`/`}>主页</Link><span style={style.there}>/&nbsp;发布话题</span></p>
				<form id="create_topic" onSubmit={this.handleSubmit} style={style.content} >
					<span>选择板块：</span>
					<Select size='large' value={topicId ? state.cnode.topic.tab : this.state.select} style={{ width: 200, marginBottom: 10, marginLeft: 10 }} onChange={this.handleSlecet}>
					  <Option value='' disabled>请选择</Option>
				      <Option value='share'>分享</Option>
				      <Option value='ask'>问答</Option>
				      <Option value='job'>招聘</Option>
				    </Select>
				    {this.state.select==='ask' ? <strong style={style.remind}>提问时，请遵循<a href="https://gist.github.com/alsotang/f654af8b1fff220e63fcb44846423e6d">《提问的智慧》</a>中提及的要点，以便您更接收到高质量回复。</strong> : ''}
				    {this.state.select==='job' ? <strong>为避免被管理员删帖，发帖时请好好阅读<a href="http://cnodejs.org/topic/541ed2d05e28155f24676a12">《招聘帖规范》</a></strong> : ''}
				    <Input style={style.input_title} value={ topicId ? state.cnode.topic.title : this.state.title } onChange={this.handleInput} placeholder='标题字数 十字以上' />
					<Awesome handleContent={this.handleContent}/>
					<Button style={style.submit} type="primary" onClick={this.handleSubmit}>提交</Button>
				</form>
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