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

const style = {
 body: {
  width: '90%',
  backgroundColor: '#fff',
  margin: '20px auto',
  borderRadius: '8px',
  padding: '10px',
  boxShadow: '5px 5px 5px #ccc'
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
  console.log(this.props)
  const {
   state,
   actions
  } = this.props
  return (
   <div style={style.body}>
       <h1>我的收藏</h1>
       <Topics topics={state.cnode.collections} actions={actions} />
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