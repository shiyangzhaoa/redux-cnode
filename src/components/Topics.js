import React from 'react'
import {
	Link
} from 'react-router'

const style = {
	img: {
		display: 'inline-block',
		width: '30px',
		height: '30px',
		borderRadius: '100%'
	},
	div: {
		padding: '5px',
		borderTop: '1px solid #ccc',
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
		marginRight: '5px'
	},
	content: {
		display: 'flex',
		alignItems: 'center'
	}
}

export default class Topics extends React.Component {
	static propTypes = {
		name: React.PropTypes.string
	}


	render() {
		const {
			topics
		} = this.props
		console.log(topics)
		let block = topics.map((value, index) => {
			let now = new Date()
			const time = now - new Date(value.last_reply_at)
			const year = Math.floor(time / 1000 / 3600 / 24 / 365) + '年前'
			const month = Math.floor(time / 1000 / 3600 / 24 / 30) + '个月前'
			const day = Math.floor(time / 1000 / 3600 / 24) + '天前'
			const hour = Math.floor(time / 1000 / 3600) + '小时前'
			const min = Math.ceil(time / 1000 / 60) + '分钟前'
			const top = !value.top || <span style={style.hot}>置顶</span>
			const good = !value.good || <span style={style.hot}>精华</span>
			let distance = (parseInt(year, 10) ? year : '') || (parseInt(month, 10) ? month : '') || (parseInt(day, 10) ? day : '') || (parseInt(hour, 10) ? hour : '') || min
			return <div style={style.div} key={index}>
  				<div style={style.content}>
  				    <Link to={`/userinfo/${value.author.loginname}`}><img alt="Avatar" style={style.img} src={value.author.avatar_url}/></Link>
	  				<span style={style.numb}>{value.reply_count || '0'}/{value.visit_count || '0'}</span>
	  				{top}{good}
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