import Main from './Main'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../redux/actions'
import {withRouter} from 'react-router'

function mapStateToProps(state) {
    return {
        categories: state, // Right now state is categories
        //items: state.items
        //access_token = state.access_token
    }
}

function mapDispatchtoProps(dispatch) {
    return bindActionCreators(actions, dispatch)
}

const App = withRouter(connect(mapStateToProps, mapDispatchtoProps)(Main))
export default App