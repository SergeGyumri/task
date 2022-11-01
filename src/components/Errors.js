import React, {Component} from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash'

class Errors extends Component {
  static propTypes = {
    errors: PropTypes.object,
  }
  static defaultProps = {
    errors: {},
  }

  render() {
    const {errors} = this.props;
    return (
      <>
        {!_.isEmpty(errors) ? _.valuesIn(errors).map((v) => {
          return <p className='errors' key={_.uniqueId()}>{v}</p>
        }) : null}
      </>
    );
  }
}


export default Errors;