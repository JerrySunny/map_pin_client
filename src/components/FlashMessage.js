import PropTypes from 'prop-types';
import React, { Component } from 'react';

/* This function returns the error message as flash message */
export class FlashMessage extends Component {
  componentWillMount() {
    const { removeMessage } = this.props;

    this.slideMessageUp();

    setTimeout(() => {
      removeMessage();
    }, 6000);
  }

  slideMessageUp() {
    const { triggerSlideUp } = this.props;

    setTimeout(() => {
      triggerSlideUp();
    }, 3000);
  }

  render() {
    const { message } = this.props;

    return (
      <div className="flash-messages-text">
        {message}
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: PropTypes.string,
  removeMessage: PropTypes.func,
  triggerSlideUp: PropTypes.func,
};

export default FlashMessage;
