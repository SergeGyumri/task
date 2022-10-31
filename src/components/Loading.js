import React, {Component} from 'react';
import MoonLoader from "react-spinners/MoonLoader";
import PropTypes from 'prop-types'

class Loading extends Component {
  static propTypes = {
    status: PropTypes.bool,
  }
  static defaultProps = {
    status: false,
  }

  render() {
    const {status} = this.props;
    return (
        <MoonLoader
          cssOverride={{
            color: 'red', border: 1, margin: ' 10px auto',
          }}
          loading={status}
          size={60}
          speedMultiplier={1}
        />
    );
  }
}

export default Loading;