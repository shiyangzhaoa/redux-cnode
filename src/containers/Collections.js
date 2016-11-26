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
  Link
} from 'react-router'

const style = {
  body: {
    width: '90%',
    backgroundColor: '#fff',
    margin: '20px auto',
    borderRadius: '8px',
    boxShadow: '5px 5px 5px #ccc',
    fontSize: '14px'
  },
  title: {
    width: '100%',
    borderBottom: '1px solid #ccc',
    padding: '10px'
  },
  content: {
    padding: '10px'
  }
}

export class Collections extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  }

  componentWillMount = () => {
    const username = this.props.routeParams.loginname
    this.getCollection(username)
  }

  //获取收藏
  getCollection = (name) => {
    this.props.actions.getCollection(name)
  }

  render() {
    const {
      state,
      actions
    } = this.props
    return (
      <div style={style.body}>
       <p style={style.title}><Link to={`/`}>主页</Link>/{this.props.routeParams.loginname}的收藏</p>
       <div style={style.content}>
         {state.cnode.collections.length === 0 ? <div>无收藏</div> : <Topics topics={state.cnode.collections} actions={actions} />}
       </div>
   </div>
    )
  }
}


Collections.propTypes = {
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
)(Collections)