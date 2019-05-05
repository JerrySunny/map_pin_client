import classNames from 'classnames';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { deleteMessage } from '../store/flashMessage/actions';
import FlashMessage from '../components/FlashMessage';

/* This function returns the error message to user as a pop up message */
class FlashMessages extends Component {
  constructor(props) {
    super(props);

    this.state = { finished: false };
  }

  removeMessage() {
    this.props.dispatch(deleteMessage());
    this.resetState();
  }

  resetState() {
    this.setState({ finished: false });
  }

  triggerSlideUp() {
    this.setState({ finished: true });
  }

  render() {
    const { message } = this.props;

    if (isEmpty(message)) {
      return null;
    }

    const messageClasses = classNames('flash-messages', `${message.messageType}`, {
      remove: this.state.finished,
    });

    return (
      <div className={messageClasses}>
        <FlashMessage
          message={message.text}
          removeMessage={() => this.removeMessage()}
          triggerSlideUp={() => this.triggerSlideUp()}
        />
      </div>
    );
  }
}

FlashMessages.propTypes = {
  dispatch: PropTypes.func,
  message: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    message: state.flashMessage ? state.flashMessage.message : '',
  };
}

export default connect(mapStateToProps)(FlashMessages);
