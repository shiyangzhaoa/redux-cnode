import React from 'react'
import {
	connect
} from 'react-redux'
import * as Actions from '../actions'
import {
	Link
} from 'react-router'
import {
	Icon,
	Form,
	Input,
	Button,
	Popover,
	BackTop,
	Spin
} from 'antd'
const FormItem = Form.Item

const style = {
	body: {
		backgroundColor: '#fff',
		padding: '20px',
		width: '90%',
		borderRadius: '8px',
		margin: '20px auto 20px'
	},
	header: {
		height: '105px'
	},
	nav: {
		display: 'inline-block',
		fontSize: '20px',
		color: '#57c5f7',
		width: '50px',
		textAlign: 'center',
		height: '30px',
		lineHeight: '30px',
		margin: '0 10px',
		transition: 'all 0.5s'
	},
	message: {
		display: 'inline-block',
		fontSize: '10px',
		textAlign: 'center',
		height: '30px',
		lineHeight: '30px',
		margin: '0 30px'
	},
	select: {
		backgroundColor: '#57c5f7',
		color: '#fff',
		borderRadius: '8px'
	},
	user: {
		float: 'right'
	},
	login: {
		width: '106px',
		float: 'right',
		marginRight: '100px'
	},
	signIn: {
		float: 'right'
	},
	collectionList: {
		padding: '5px 0',
		textAlign: 'center',
		backgroundColor: '#f2f2f2',
		marginTop: '10px',
		borderRadius: '8px'
	}
}


export class Head extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	}

	state = {
		selected: 'all',
		loginname: '',
		visible: false,
		form: false
	}

	componentWillMount = () => {
		let slugParam = this.getSlug()
		let accesstoken = localStorage.getItem("loginname") || ''
		if (accesstoken) {
			const {
				userLogin
			} = this.props
			const data = {
				accesstoken: accesstoken
			}
			userLogin(data)
		}
		const loginname = this.props.state.cnode.loginname
		this.setState({
			selected: slugParam,
			loginname: loginname
		})
		this.props.getMessageNum(accesstoken)
	}

	componentWillReceiveProps = (nextProps) => {
		let slug = nextProps.params.categorySlug
		let nextSlug = slug ? slug : 'all'
		if (this.getSlug() !== nextSlug) {
			this.setState({
				selected: nextSlug
			})
		}
		if (nextProps.state.cnode.login === 'success') {
			this.setState({
				form: false,
				loginname: nextProps.state.cnode.loginname
			})
		}
		if (nextProps.state.cnode.login === 'fail') {
			alert("access token错误")
		}
		if (nextProps.state.cnode.login === 'leave') {
			this.setState({
				loginname: ''
			})
		}
	}

	signOut = () => {
		this.setState({
			visible: false
		})
		this.props.signOut()
		localStorage.clear("loginname")
	}

	getSlug = () => {
		let slugParam = this.props.params.categorySlug
		slugParam = slugParam ? slugParam : 'all'
		return slugParam
	}

	signIn = () => {
		this.setState({
			form: true,
			visible: false
		})
	}

	login = (data) => {
		const {
			userLogin
		} = this.props
		userLogin(data)
		this.setState({
			modal1Visible: false
		})
	}

	handleVisibleChange = (visible) => {
		this.setState({
			visible
		})
	}

	render() {
		console.log(this.props)
		const username = this.state.loginname
		let that = this
		const tabList = ['all', 'good', 'share', 'ask', 'job']
		const HorizontalLoginForm = Form.create()(React.createClass({
			handleSubmit(e) {
				e.preventDefault()
				this.props.form.validateFields((err, values) => {
					if (!err) {
						that.login(values)
					}
				});
			},
			render() {
				const {
					getFieldDecorator
				} = this.props.form
				return (
					<Form inline onSubmit={this.handleSubmit}>
	        <FormItem>
	          {getFieldDecorator('accesstoken', {
	            rules: [{ required: true, message: 'Please input your username!' }],
	          })(
	            <Input addonBefore={<Icon type="user" />} placeholder="请输入你的accesstoken" />
	          )}
	        </FormItem>
	        <FormItem>
	          <Button type="primary" htmlType="submit">登陆</Button>
	        </FormItem>
	      </Form>
				);
			},
		}))
		return (
			<div style={style.body}>
			<div style={style.header}>
				<div style={style.login}>
      		<BackTop visibilityHeight='100'/>
      		<Popover
	        	content={<a onClick={username ? this.signOut : this.signIn}>{username ? '退出' : '登陆'}</a>}
	        	title="登陆/退出"
	        	trigger="click"
	        	visible={this.state.visible}
	        	onVisibleChange={this.handleVisibleChange}
	      	>
	      	
	        	<Button type="primary">{username || '未登录'}</Button>
	        
	      	</Popover>
	      	<Spin tip="登陆中..." spinning={this.props.state.cnode.userlogin}>
	      	{ !username || <Link to={`/collect/${username}`}><div style={style.collectionList}>收藏列表</div></Link>}
	      	{ !username || <Link to={`/user/${username}`}><div style={style.collectionList}>个人信息</div></Link>}
	      	</Spin>
      	</div>
      	<div style={style.signIn} >
      		{this.state.form ? <HorizontalLoginForm /> : ''}
      	</div>
	    {tabList.map((value, index) => {
	    		let selected = (this.state.selected === value) ? {...style.nav, ...style.select} : style.nav
	    		const end1 = (value === 'ask') ? '问答' : ''
  				const end2 = (value === 'job') ? '招聘' : ''
  				const end3 = (value === 'share') ? '分享' : ''
  				const end4 = (value === 'good') ? '精华' : ''
  				const end5 = (value === 'all') ? '全部' : ''
	    		return <Link style={selected} to={`/category/${value}`} key={index}>{end1||end2||end3||end4||end5}</Link>
	    	
	    }
	    )}
		{ !username || <Link to='/message' style={style.message} >未读信息{this.props.state.message.messageNum ? this.props.state.message.messageNum : ''}</Link>}
			</div>
      		{this.props.children}
      	</div>
		)
	}
}

const mapStateToProps = state => ({
	state: state
})

export default connect(
	mapStateToProps,
	Actions
)(Head)