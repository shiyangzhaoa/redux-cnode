import React from 'react'
import {
	connect
} from 'react-redux'
import * as TodoActions from '../actions'
import ReactMarkdown from 'react-markdown'
import {
	Button
} from 'antd'
import {
	Editor,
	EditorState,
	RichUtils
} from 'draft-js'

require("../public/draftjs.css")


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
		margin: '20px 0',
		textAlign: 'center'
	},
	info: {
		padding: '40px 10px',
		color: '#838383'
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
		width: '70%',
		margin: '30px auto',
		borderRadius: '5px',
		backgroundColor: '#fff',
	},
	ansNumb: {
		padding: '10px',
		backgroundColor: '#f6f6f6',
		borderRadius: '5px 5px 0 0',
		fontSize: '14px'
	}
}

const styleMap = {
	CODE: {
		backgroundColor: 'rgba(0, 0, 0, 0.05)',
		fontFamily: 'Source Code Pro',
		fontSize: 16,
		padding: 2,
	},
};

class Awesome extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			editorState: EditorState.createEmpty(),
		};

		this.focus = () => this.refs.editor.focus();
		this.onChange = (editorState) => this.setState({
			editorState
		});

		this.handleKeyCommand = (command) => this._handleKeyCommand(command);
		this.toggleBlockType = (type) => this._toggleBlockType(type);
		this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
	}

	_handleKeyCommand(command) {
		const {
			editorState
		} = this.state;
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			this.onChange(newState);
			return true;
		}
		return false;
	}

	_toggleBlockType(blockType) {
		this.onChange(
			RichUtils.toggleBlockType(
				this.state.editorState,
				blockType
			)
		);
	}

	_toggleInlineStyle(inlineStyle) {
		this.onChange(
			RichUtils.toggleInlineStyle(
				this.state.editorState,
				inlineStyle
			)
		);
	}

	render() {
		const {
			editorState
		} = this.state;
		console.log(editorState);
		let className = 'RichEditor-editor';
		var contentState = editorState.getCurrentContent();
		if (!contentState.hasText()) {
			if (contentState.getBlockMap().first().getType() !== 'unstyled') {
				className += ' RichEditor-hidePlaceholder';
			}
		}

		return (<div>
              <div className="control-box">
              <h1 className="title">添加你的回复</h1>
              <BlockStyleControls
                editorState={editorState}
                onToggle={this.toggleBlockType}
              />
              <InlineStyleControls
                editorState={editorState}
                onToggle={this.toggleInlineStyle}
              />
        </div>
      <div className="RichEditor-root">
        
              <div className={className} onClick={this.focus}>
                <Editor
                  blockStyleFn={getBlockStyle}
                  customStyleMap={styleMap}
                  editorState={editorState}
                  handleKeyCommand={this.handleKeyCommand}
                  onChange={this.onChange}
                  ref="editor"
                  spellCheck={true}
                />
              </div>
            </div>
        </div>);
	}
}


function getBlockStyle(block) {
	switch (block.getType()) {
		case 'blockquote':
			return 'RichEditor-blockquote';
		default:
			return null;
	}
}

class StyleButton extends React.Component {
	constructor() {
		super();
		this.onToggle = (e) => {
			e.preventDefault();
			this.props.onToggle(this.props.style);
		};
	}

	render() {
		let className = 'RichEditor-styleButton';
		if (this.props.active) {
			className += ' RichEditor-activeButton';
		}

		return (
			<span className={className} onMouseDown={this.onToggle}>
              {this.props.label}
            </span>
		);
	}
}

const BLOCK_TYPES = [{
	label: 'H1',
	style: 'header-one'
}, {
	label: 'H2',
	style: 'header-two'
}, {
	label: 'H3',
	style: 'header-three'
}, {
	label: 'H4',
	style: 'header-four'
}, {
	label: 'H5',
	style: 'header-five'
}, {
	label: 'H6',
	style: 'header-six'
}, {
	label: 'Blockquote',
	style: 'blockquote'
}, {
	label: 'UL',
	style: 'unordered-list-item'
}, {
	label: 'OL',
	style: 'ordered-list-item'
}, {
	label: 'Code Block',
	style: 'code-block'
}, ];

const BlockStyleControls = (props) => {
	const {
		editorState
	} = props;
	const selection = editorState.getSelection();
	const blockType = editorState
		.getCurrentContent()
		.getBlockForKey(selection.getStartKey())
		.getType();

	return (
		<div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
              <StyleButton
                key={type.label}
                active={type.style === blockType}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
              />
            )}
          </div>
	);
};

var INLINE_STYLES = [{
	label: 'Bold',
	style: 'BOLD'
}, {
	label: 'Italic',
	style: 'ITALIC'
}, {
	label: 'Underline',
	style: 'UNDERLINE'
}, {
	label: 'Monospace',
	style: 'CODE'
}, ];

const InlineStyleControls = (props) => {
	var currentStyle = props.editorState.getCurrentInlineStyle();
	return (
		<div className="RichEditor-controls">
            {INLINE_STYLES.map(type =>
              <StyleButton
                key={type.label}
                active={currentStyle.has(type.style)}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
              />
            )}
          </div>
	);
};

class Detail extends React.Component {
	static propTypes = {
		name: React.PropTypes.string
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
		console.log(collectNow, collectNext)
		if (loginname) {
			if (collectNow !== collectNext) {
				const {
					topicDetail,
					route
				} = nextProps
				topicDetail(route.params.id)
			}
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

	render() {
		const {
			state
		} = this.props
		const topic = state.cnode.topic
			//console.log(topic)
		let now = new Date()
		const time = now - new Date(topic.create_at)
		const year = Math.floor(time / 1000 / 3600 / 24 / 365) + '年前'
		const month = Math.floor(time / 1000 / 3600 / 24 / 30) + '个月前'
		const day = Math.floor(time / 1000 / 3600 / 24) + '天前'
		const hour = Math.floor(time / 1000 / 3600) + '小时前'
		const min = Math.ceil(time / 1000 / 60) + '分钟前'
		let distance = (parseInt(year, 10) ? year : '') || (parseInt(month, 10) ? month : '') || (parseInt(day, 10) ? day : '') || (parseInt(hour, 10) ? hour : '') || min
		const content = topic.content || ''
		const author = topic.author || ''
		const tab = topic.tab || ''
		const end1 = (tab === 'ask') ? '问答' : ''
		const end2 = (tab === 'job') ? '招聘' : ''
		const end3 = (tab === 'share') ? '分享' : ''
		const end4 = (tab === 'good') ? '精华' : ''
		const top = !topic.top || <span style={style.hot}>置顶</span>
		const good = !topic.good || <span style={style.hot}>精华</span>
		const topicContent = <ReactMarkdown source={content} />
		const ansList = topic.replies || []
		const loginname = localStorage.getItem("loginname") || ''
		return (
			<div style={style.body}>
	    <h1 style={style.title}>{top}{good}{topic.title}</h1>
	    <div style={style.info}>
	      <span>•发表于&nbsp;{distance}</span>
	      <span>•作者&nbsp;{author.loginname}</span>
	      <span>•{topic.visit_count}&nbsp;次浏览</span>
	      <span>•来自&nbsp;{end1||end2||end3||end4}</span>
	      <Button style={style.collection} type="primary" disabled={!loginname} onClick={topic.is_collect ? this.cancelCollect : this.collect}>{topic.is_collect ? '取消收藏' : '收藏'}</Button>
	    </div>
	    {topicContent}
	    <div style={style.content}>
	      <p style={style.ansNumb}>{ansList.length}&nbsp;条回复</p>
	      <Awesome />
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