import React, {Component} from 'react';
import SyncLoader from "react-spinners/SyncLoader";
import PropTypes from 'prop-types'

class Typing extends Component {
  static propTypes = {
    status: PropTypes.bool,
  }
  static defaultProps = {
    status: false,
  }

  render() {
    const {status} = this.props;
    return (
        <SyncLoader
          color='#f9f9f9'
          cssOverride={{border: 1, margin: ' 20px 25px',}}
          loading={status}
          size={10}
          speedMultiplier={0.5}
        />
    );
  }
}

export default Typing;