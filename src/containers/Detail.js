import React from 'react'
import {
	connect
} from 'react-redux'
import * as TodoActions from '../actions'
import ReactMarkdown from 'react-markdown'
import {
	Button,
	Input,
	Form,
	message,
	Mention
} from 'antd'
import {
	Link
} from 'react-router'

const {
	toString,
	toEditorState
} = Mention

const editimg = require("../public/edit.png")
const starimg = require("../public/star.png")
const repliseimg = require("../public/replise.png")
const deleteRepimg = require("../public/delete.png")
const revise = require("../public/revise.png")


//样式
const style = {
	body: {
		width: '90%',
		overflow: 'hidden',
		backgroundColor: '#fff',
		margin: '20px auto',
		borderRadius: '8px',
		padding: '10px',
		boxShadow: '5px 5px 5px #ccc'
	},
	title: {
		margin: '8px 0',
		textAlign: 'center'
	},
	nav: {
		width: '100%',
		height: '40px',
		fontSize: '14px',
		lineHeight: '40px',
		paddingLeft: '5px'
	},
	info: {
		color: '#838383',
		marginBottom: '10px'
	},
	hot: {
		display: 'inline-block',
		backgroundColor: '#80bd01',
		color: '#fff',
		borderRadius: '4px',
		padding: '3px',
		marginRight: '5px',
		fontSize: '12px'
	},
	collection: {
		float: 'right'
	},
	content: {
		width: '85%',
		margin: '30px auto',
		borderRadius: '5px',
		backgroundColor: '#fff',
	},
	ansNumb: {
		padding: '10px',
		backgroundColor: '#f6f6f6',
		borderRadius: '5px 5px 0 0',
		fontSize: '14px'
	},
	apl_content: {
		display: 'inline-block',
		fontSize: '14px'
	},
	imginfo: {
		width: '30px',
		height: '30px',
		float: 'left',
		borderRadius: '3px'
	},
	apl_box: {
		padding: '10px',
		borderTop: '1px solid #f0f0f0',
		position: 'relative'
	},
	content_text: {
		marginLeft: '30px',
		paddingLeft: '10px',
		wordBreak: 'break-all',
		fontSize: '14px'
	},
	option: {
		position: 'absolute',
		top: '3px',
		right: '5px'
	},
	opt: {
		display: 'inline-block',
		width: '15px',
		height: '15px',
		cursor: 'pointer',
		marginLeft: '10px'
	},
	star_num: {
		position: 'absolute',
		top: '-2px'
	},
	resive: {
		background: `url(${revise})`,
		backgroundSize: 'cover',
		display: 'block',
		width: '20px',
		height: '20px'
	}
}

const FormItem = Form.Item
const HorizontalLoginForm = Form.create()(React.createClass({
	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const acc = localStorage.getItem("loginname") || ''
				const data = {
					id: this.props.state.topic.id,
					accesstoken: acc,
					content: values.content
				}
				this.props.addReplies(data)
			}
		});
	},
	render() {
		const {
			getFieldDecorator
		} = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('content', {
            rules: [{ required: true, message: '请输入你套提交的评论!' }],
          })(
            <Input type="textarea" rows={4} placeholder="提交评论" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">提交</Button>
        </FormItem>
      </Form>
		);
	},
}));

class Detail extends React.Component {
	static propTypes = {
		name: React.PropTypes.string
	}

	state = {
		showRep: -1,
		content: '',
	}

	componentWillMount = () => {
		const {
			topicDetail,
			route
		} = this.props
		topicDetail(route.params.id)
	}

	componentWillReceiveProps = (nextProps) => {
		const loginname = localStorage.getItem("loginname") || ''
		const collectNow = this.props.state.cnode.collect
		const collectNext = nextProps.state.cnode.collect
		if (loginname) {
			if (collectNow !== collectNext && collectNext === 'success') {
				const {
					topicDetail,
					route
				} = nextProps
				topicDetail(route.params.id)
			}
			if (this.props.state.cnode.rep_succ !== nextProps.state.cnode.rep_succ && nextProps.state.cnode.rep_succ === 'success') {
				message.success('评论成功')
				const {
					topicDetail,
					route
				} = this.props
				topicDetail(route.params.id)
			} else if (this.props.state.cnode.rep_succ !== nextProps.state.cnode.rep_succ && (nextProps.state.cnode.rep_succ === 'fail')) {
				message.error('请先登陆')
			}
			if (this.props.state.cnode.star !== nextProps.state.cnode.star && (nextProps.state.cnode.star === 'up' || nextProps.state.cnode.star === 'down')) {
				const {
					topicDetail,
					route
				} = this.props
				topicDetail(route.params.id)
			} else if (this.props.state.cnode.star !== nextProps.state.cnode.star && (nextProps.state.cnode.star === 'fail')) {
				message.error('请先登陆')
			}
		} else if ((this.props.state.cnode.rep_succ !== nextProps.state.cnode.rep_succ && (nextProps.state.cnode.rep_succ === 'fail')) || (this.props.state.cnode.star !== nextProps.state.cnode.star && (nextProps.state.cnode.star === 'fail'))) {
			message.error('请先登陆')
		}
	}

	collect = () => {
		const {
			route
		} = this.props
		const loginname = localStorage.getItem("loginname") || ''
		this.props.collect(route.params.id, loginname)
	}

	cancelCollect = () => {
		const {
			route
		} = this.props
		const loginname = localStorage.getItem("loginname") || ''
		this.props.cancelCollect(route.params.id, loginname)
	}

	getTime = (creattime) => {
			let now = new Date()
			const time = now - new Date(creattime)
			const year = Math.floor(time / 1000 / 3600 / 24 / 365) + '年前'
			const month = Math.floor(time / 1000 / 3600 / 24 / 30) + '个月前'
			const day = Math.floor(time / 1000 / 3600 / 24) + '天前'
			const hour = Math.floor(time / 1000 / 3600) + '小时前'
			const min = Math.floor(time / 1000 / 60) + '分钟前'
			const second = Math.ceil(time / 1000) + '秒前'
			const distance = (parseInt(year, 10) ? year : '') || (parseInt(month, 10) ? month : '') || (parseInt(day, 10) ? day : '') || (parseInt(hour, 10) ? hour : '') || (parseInt(min, 10) ? min : '') || second
			return distance
		}
		//点赞
	addStar = (reid) => {
		const acc = localStorage.getItem("loginname") || ''
		this.props.addStar(acc, reid)
	}

	onChange = (editorState) => {
		let content = toString(editorState)
		this.setState({
			content: content
		})

	}
	onSelect = (suggestion) => {
		console.log('onSelect', suggestion)
	}

	submitrep = (index) => {
			this.setState({
				showRep: index
			})
		}
		//指定回复
	addtoRep = (topic) => {
		const {
			state,
			addReplies
		} = this.props
		const acc = localStorage.getItem("loginname") || ''
		const data = {
			id: state.cnode.topic.id,
			accesstoken: acc,
			content: this.state.content,
			reply_id: topic.id
		}
		addReplies(data)
		this.setState({
			showRep: -1
		})
	}

	render() {
		const {
			state
		} = this.props
		const topic = state.cnode.topic
		let username = localStorage.getItem("username") || ''
			//console.log(topic)
		let distance = this.getTime(topic.create_at)
		const content = topic.content || ''
		const author = topic.author || ''
		const tab = topic.tab || ''
		const end = tab.replace('ask', '问答').replace('job', '招聘').replace('share', '分享').replace('good', '精华')
		const top = topic.top ? <span style={style.hot}>置顶</span> : ''
		const good = topic.good ? <span style={style.hot}>精华</span> : ''
		const topicContent = <ReactMarkdown source={content} />
		const _replies = topic.replies || []
		const loginname = localStorage.getItem("loginname") || ''
		const that = this
		const replies = _replies.map((value, index) => {
			console.log(value)
			let apdistance = this.getTime(value.create_at)
			const username = localStorage.getItem("username") || ''
			return (
				<div style={style.apl_box} key={value.id}>
					<Link to={`/user/${value.author.loginname}`}><img style={style.imginfo} src={value.author.avatar_url} alt="avatar" /></Link>
					<div style={style.apl_content}>
						<Link to={`/user/${value.author.loginname}`}><span>{value.author.loginname}</span></Link>
						<span>{index+1}楼•{apdistance}</span>
					</div>
					<div style={style.content_text}><ReactMarkdown source={value.content} /></div>
					<div style={style.option}>
						{username===value.author.loginname ? <img  src={editimg} alt="编辑" style={style.opt} /> : ''}
						{username===value.author.loginname ? <img src={deleteRepimg} alt="删除" style={style.opt} /> : ''}
						{username===value.author.loginname ? '' : <span><img src={starimg} onClick={that.addStar.bind(this, value.id)} alt="点赞" style={style.opt} /><span style={style.star_num}>{value.ups.length}</span></span>}
						<img src={repliseimg} alt="回复" style={style.opt} onClick={this.submitrep.bind(this, index)}/>
					</div>
					{this.state.showRep === index ? <div>
						<Mention
						    style={{ width: '100%', height: 100 }}
						    onChange={that.onChange}
						    defaultValue={toEditorState('@'+value.author.loginname)}
						    suggestions={[value.author.loginname]}
						    onSelect={that.onSelect}
						  />
						<Button type="primary" onClick={this.addtoRep.bind(this, value)}>提交</Button>
					</div> : ''}
				</div>
			)
		})
		return (
			<div style={style.body}>
		<p style={style.nav}><Link to={`/`}>主页</Link>/详情页</p>
	    <h1 style={style.title}>{top || good}{topic.title}</h1>
	    <div style={style.info}>
	      <span>•发表于&nbsp;{distance}</span>
	      <span>•作者&nbsp;{author.loginname}</span>
	      <span>•{topic.visit_count}&nbsp;次浏览</span>
	      <span>•来自&nbsp;{end}</span>
	      <Button style={style.collection} type="primary" disabled={!loginname} onClick={topic.is_collect ? this.cancelCollect : this.collect}>{topic.is_collect ? '取消收藏' : '收藏'}</Button>
	    </div>
	    {username===author.loginname ? <Link style={style.resive} to={`/createtopic/${topic.id}`}></Link> : ''}
	    {topicContent}
	    <div style={style.content}>
	      <p style={style.ansNumb}>{replies.length}&nbsp;条回复</p>
	      {replies}
	      <HorizontalLoginForm addReplies={this.props.addReplies} state={this.props.state.cnode}/>
	    </div>
      </div>
		);
	}
}

const mapStateToProps = (state, option) => ({
	state: state,
	route: option
})

export default connect(
	mapStateToProps,
	TodoActions
)(Detail)