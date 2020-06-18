import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import * as actions from '../redux/actions';
import Main from './Main';

function mapStateToProps(state) {
  return {
    categories: state.categories,
    items: state.items,
    access_token: state.access_token,
    error: state.error,
    user: state.user,
  };
}

function mapDispatchtoProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

const App = withRouter(connect(mapStateToProps, mapDispatchtoProps)(Main));
export default App;
