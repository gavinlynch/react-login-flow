import React from 'react';

class Button extends React.Component {
  static get propTypes () {
    return {
      label: React.PropTypes.string.isRequired,
      theme: React.PropTypes.string,
      disabled: React.PropTypes.bool,
      isProcessing: React.PropTypes.bool
    };
  }

  static get defaultProps () {
    return {
      theme: 'dark',
      disabled: false
    };
  }

  render () {
    var classNames = ['is-' + this.props.theme];
    if (this.props.isProcessing) {
      classNames.push('is-processing');
    }

    return (
      <button ref="el" className={classNames.join(' ')}
          disabled={this.props.disabled === true}>
        <label>{this.props.label}</label>
      </button>);
  }
}

export default Button;
