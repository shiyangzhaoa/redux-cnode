import React from 'react'
import {
	Link
} from 'react-router'

const style = {
	img: {
		display: 'inline-block',
		width: '30px',
		height: '30px',
		borderRadius: '3px'
	},
	div: {
		padding: '5px',
		borderBottom: '1px solid #ccc',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	numb: {
		color: '#ff6666',
		margin: '0 10px',
		width: '60px',
		textAlign: 'center',
		wordBreak: 'break-word'
	},
	time: {
		color: '#ccc'
	},
	hot: {
		display: 'inline-block',
		backgroundColor: '#80bd01',
		color: '#fff',
		borderRadius: '4px',
		padding: '3px',
		marginRight: '5px',
		minWidth: '30px'
	},
	general: {
		display: 'inline-block',
		backgroundColor: '#e5e5e5',
		color: '#999999',
		borderRadius: '4px',
		padding: '3px',
		marginRight: '5px',
		minWidth: '30px'
	},
	content: {
		display: 'flex',
		alignItems: 'center'
	},
	none: {}
}

export default class Topics extends React.Component {
	static propTypes = {
		name: React.PropTypes.string
	}


	render() {
		const {
			topics
		} = this.props
		let block = topics.map((value, index) => {
			let now = new Date()
			const time = now - new Date(value.last_reply_at)
			const year = Math.floor(time / 1000 / 3600 / 24 / 365) + '年前'
			const month = Math.floor(time / 1000 / 3600 / 24 / 30) + '个月前'
			const day = Math.floor(time / 1000 / 3600 / 24) + '天前'
			const hour = Math.floor(time / 1000 / 3600) + '小时前'
			const min = Math.floor(time / 1000 / 60) + '分钟前'
			const second = Math.floor(time / 1000) + '秒前'
			const end1 = (value.tab === 'ask') ? '问答' : ''
			const end2 = (value.tab === 'job') ? '招聘' : ''
			const end3 = (value.tab === 'share') ? '分享' : ''
			const end4 = (value.top === true) ? '置顶' : ''
			const end5 = (value.good === true) ? '精华' : ''
			const distance = (parseInt(year, 10) ? year : '') || (parseInt(month, 10) ? month : '') || (parseInt(day, 10) ? day : '') || (parseInt(hour, 10) ? hour : '') || (parseInt(min, 10) ? min : '') || second
			return <div style={style.div} key={index}>
  				<div style={style.content}>
  				    <Link to={`/user/${value.author.loginname}`}><img alt="Avatar" style={style.img} src={value.author.avatar_url}/></Link>
	  				<span style={style.numb}>{value.reply_count || '0'}/{value.visit_count || '0'}</span>
	  				{(this.props.sluge==='all' && !value.top && !value.good) ? <span style={style.general}>{end3||end2||end1||'未知'}</span> : <span style={(end4||end5)?style.hot:style.none}>{end4||end5}</span>}
	  				<Link to={`/topic/${value.id}`}>{value.title}</Link>
  				</div>
	  			<span style={style.time}>{distance}</span>
	  		</div>
		})
		return (
			<div>
      			{block}
      		</div>
		)
	}
}