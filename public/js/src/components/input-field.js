import React from 'react';
import Tipsy from 'jquery.tipsy';

/**
 * Component that manages user input and validation.
 */
class InputField extends React.Component {
  static get propTypes () {
    return {
      name: React.PropTypes.string.isRequired,
      type: React.PropTypes.string.isRequired,
      theme: React.PropTypes.string,
      isValid: React.PropTypes.bool,
      msgHint: React.PropTypes.string,
      msgWarning: React.PropTypes.string
    };
  }

  static get defaultProps () {
    return {
      type: 'text',
      theme: 'light'
    };
  }

  /**
   * Set up events after view has mounted to DOM.
   */
  componentDidMount () {
    $(this.refs.el).find('.title-tooltip').tipsy({live: true});
  }

  /**
   * Render view.
   */
  render () {
    var classes = ['with-icons'];
    if (this.props.isValid === false) {
      classes.push('has-error');
    }

    return (
      <div ref="el" className={classes.join(' ')}>
        <svg className="hint title-tooltip" title={this.props.msgHint}>
          <use xlinkHref={'/assets/sprites.svg#' + this.props.name + '-icon'}></use>
        </svg>
        <input className={'is-' + this.props.theme}
            name={this.props.name} placeholder={this.props.name} type={this.props.type} />
        <svg className="warning title-tooltip" title={this.props.msgWarning}>
          <use xlinkHref="/assets/sprites.svg#warning-icon"></use>
        </svg>
      </div>);
  }
}

export default InputField;
