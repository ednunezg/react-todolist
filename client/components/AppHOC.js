import App from './App';
import { withRouter } from 'react-router'

//Using HOC to access Browser Router history

// import { connect } from 'react-redux';

// function mapStateToProps(state) {
//   return {};
// }

// function mapDispatchToProps() {
//     return {};
// }

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

export default withRouter(App);