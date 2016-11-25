import React from 'react'
import {
	Editor,
	EditorState,
	RichUtils
} from 'draft-js'
require("../public/draftjs.css")

const styleMap = {
	CODE: {
		backgroundColor: 'rgba(0, 0, 0, 0.05)',
		fontFamily: 'Source Code Pro',
		fontSize: 16,
		padding: 2,
	},
};


export class Awesome extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			editorState: EditorState.createEmpty(),
		};

		this.focus = () => this.refs.editor.focus();
		this.onChange = (editorState) => {
			this.setState({
				editorState
			})
			this.props.handleContent(editorState)
		};

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
              <h1 className="title">发布主题</h1>
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