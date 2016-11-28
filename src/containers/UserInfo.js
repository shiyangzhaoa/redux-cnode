import React, {
	PropTypes
} from 'react'
import {
	bindActionCreators
} from 'redux'
import {
	connect
} from 'react-redux'
import Topics from '../components/Topics'
import * as Actions from '../actions'
import {
	BackTop
} from 'antd'
import {
	Link
} from 'react-router'

const style = {
	body: {
		width: '70%',
		height: '100%',
		minWidth: '700px',
		display: 'inline-block'
	},
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
	user: {
		width: '25%',
		minWidth: '300px',
		backgroundColor: '#fff',
		borderRadius: '8px',
		boxShadow: '5px 5px 5px #ccc',
		display: 'inline-block',
		position: 'absolute',
		top: '20px'
	},
	no: {
		padding: '10px',
		height: '60px',
		fontSize: '14px'
	},
	userHome: {
		padding: '10px',
		backgroundColor: '#fff',

	},
	avatar: {
		width: '40px',
		height: '40px',
		backgroundColor: '#f2f2f2'
	},
	useravatar: {
		display: 'flex',
		alignItems: 'center',
		padding: '5px 0'
	},
	namesmall: {
		color: '#778087',
		fontSize: '15px',
		marginLeft: '5px'
	},
	avatarbig: {
		width: '48px',
		height: '48px',
		backgroundColor: '#f2f2f2'
	},
	namesbig: {
		color: '#778087',
		fontSize: '17px',
		marginLeft: '5px'
	},
	signature: {
		fontStyle: 'italic',
		fontSize: '13px'
	}
}

export class UserInfo extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	}

	componentWillMount = () => {
		const loginname = this.props.routeParams.loginname
		this.getUserInfo(loginname)
	}

	componentWillReceiveProps = (nextProps) => {
		let nextLoginName = nextProps.routeParams.loginname
		let nowLoginName = this.props.routeParams.loginname
		if (nextLoginName !== nowLoginName) {
			this.getUserInfo(nextLoginName)
		}
	}

	//获取用户信息
	getUserInfo = (loginname) => {
		this.props.actions.getUserInfo(loginname)
	}

	render() {
		const {
			state,
			actions
		} = this.props
		const userinfo = state.cnode.userinfo
		const recent_replies = userinfo.recent_replies || []
		const recent_topics = userinfo.recent_topics || []

		let now = new Date()
		const timeNow = now - new Date(userinfo.create_at)
		const year = Math.floor(timeNow / 1000 / 3600 / 24 / 365) + '年前'
		const month = Math.floor(timeNow / 1000 / 3600 / 24 / 30) + '个月前'
		const day = Math.floor(timeNow / 1000 / 3600 / 24) + '天前'
		const hour = Math.floor(timeNow / 1000 / 3600) + '小时前'
		const min = Math.floor(timeNow / 1000 / 60) + '分钟前'
		const second = Math.floor(timeNow / 1000) + '秒前'
		const distance = (parseInt(year, 10) ? year : '') || (parseInt(month, 10) ? month : '') || (parseInt(day, 10) ? day : '') || (parseInt(hour, 10) ? hour : '') || (parseInt(min, 10) ? min : '') || second
		return (
			<div>
				<div style={style.body}>
					<BackTop visibilityHeight='100' />
					<div style={style.content}>
						<p style={style.title}><Link to={`/`}>主页</Link>/</p>
						<div style={style.userHome}>
							<div style={style.useravatar}>
								<img style={style.avatar} src={userinfo.avatar_url} alt="user" />
								<span style={style.namesmall}>{userinfo.loginname}</span>
							</div>
							<p>{userinfo.score}&nbsp;积分</p>
							<Link to={`/collect/${userinfo.loginname}`}><p>话题收藏</p></Link>
							{!userinfo.githubUsername || <p><a href={`https://github.com/${userinfo.githubUsername}`}>@{userinfo.githubUsername}</a></p>}
							<p>注册时间&nbsp;{distance}</p>
						</div>
					</div>
					<div style={style.content}>
						<p style={style.title}>最近创建的话题</p>
						{recent_topics.length===0 ? <div style={style.no}>无话题</div> : <Topics topics={recent_topics} actions={actions} />}
					</div>
					<div style={style.content}>
						<p style={style.title}>最近参与的话题</p>
						{recent_replies.length===0 ? <div style={style.no}>无话题</div> : <Topics topics={recent_replies} actions={actions} />}
					</div>
	     		</div>
	     		<div style={style.user}>
					<p style={style.title}>个人信息</p>
						<div style={style.userHome}>
							<div style={style.useravatar}>
								<img style={style.avatarbig} src={userinfo.avatar_url} alt="user" />
								<span style={style.namesbig}>{userinfo.loginname}</span>
							</div>
							<p>积分&nbsp;{userinfo.score}</p>
							<p style={style.signature}>"这家伙很懒，什么个性签名都没留下"</p>
						</div>
				</div>
			</div>
		)
	}
}


UserInfo.propTypes = {
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
)(UserInfo)