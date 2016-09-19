import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import API from 'src/api';
import Button from 'src/components/button';
import InputField from 'src/components/input-field';

/**
 * Initial LoginForm state.
 * Used by main.js to create a composition app-level initialState from components.
 */
export let initialState = {
  form: {
    msg: '',
    isValid: false,
    isProcessing: false,
    username: {
      isValid: undefined
    },
    password: {
      isValid: undefined
    }
  }
};

/**
 * Reducers for LoginForm state.
 * Used by main.js to create app-level reducers via combineReducers.
 */
export let reducers = {
  form (state = initialState, action) {
    switch (action.type) {
    case 'SET_MESSAGE':
      return Object.assign({}, state, {
        msg: action.msg
      });
    case 'SET_VALIDITY':
      return Object.assign({}, state, {
        isValid: action.isValid ? true : false
      });
    case 'SET_IS_PROCESSING':
      return Object.assign({}, state, {
        isProcessing: action.isProcessing ? true : false
      });
    case 'SET_INPUT_MESSAGE':
      return Object.assign({}, state, {
        [action.inputName]: {
          msg: action.msg
        }
      });
    case 'SET_INPUT_VALIDITY':
      return Object.assign({}, state, {
        [action.inputName]: {
          isValid: action.isValid ? true : false
        }
      });
    default:
      return state;
    }
  }
};

/**
 * Actions for LoginForm state
 */
export let actions = {
  setMsg: (msg) => {
    return { type: 'SET_MESSAGE', msg }
  },

  setValidity: (isValid) => {
    return { type: 'SET_VALIDITY', isValid }
  },

  setIsProcessing: (isProcessing) => {
    return { type: 'SET_IS_PROCESSING', isProcessing }
  },

  setInputMsg: (inputName, msg) => {
    return { type: 'SET_INPUT_MESSAGE', inputName, msg }
  },

  setInputValidity: (inputName, isValid) => {
    return { type: 'SET_INPUT_VALIDITY', inputName, isValid }
  }
};

/**
 * Reducer and Dispatch mapping, connecting Redux + React
 */
const mapStateToProps = (store) => {
  return store;
};

const mapDispatchToProps = (dispatch) => {
  return { formActions: bindActionCreators(actions, dispatch) }
}

/**
 * Component that manages user input & validation, form submission.
 */
class LoginFormComponent extends React.Component {
  static get propTypes () {
    return {
      toRoute: React.PropTypes.string.isRequired,
      isValid: React.PropTypes.bool,
      minInputLength: React.PropTypes.number,
      formActions: React.PropTypes.object,
      userActions: React.PropTypes.object,
      form: React.PropTypes.object
    };
  }

  static get defaultProps () {
    return {
      minInputLength: 3
    };
  }

  /**
   * Set up properties before mounting
   */
  componentWillMount () {
    this.api = new API();
  }

  /**
   * Set up events after view has mounted to DOM.
   */
  componentDidMount () {
    // when the user clicks submit
    this.refs.formEl.querySelector('button').addEventListener(
        'click', this.onSubmit.bind(this));
    // when the user enters username/passsword
    [].forEach.call(this.refs.formEl.querySelectorAll('input'),
        (el) => el.addEventListener('keyup', this.onKeyUp.bind(this)));
  }

  /**
   * Handle user typing on input field.
   * @param {Synthetic Event} event ReactJS keyboard event.
   */
  onKeyUp (event) {
    this.props.formActions.setInputValidity(
        event.srcElement.name, this.validate(event.srcElement.value));

    this.props.formActions.setValidity(
        this.props.form.username.isValid &&
        this.props.form.password.isValid);
  }

  /**
   * Test if the given value not empty and is long enough.
   * @param {String} val The field value to test for validity.
   * @return {Boolean} is valid.
   */
  validate (val) {
    var isEmpty = val === '',
        isLongEnough = val.length >= this.props.minInputLength;

    return !isEmpty && isLongEnough;
  }

  /**
   * Handle form submission.
   * @param {SyntheticEvent} event The submit event.
   */
  onSubmit (event) {
    event.preventDefault();
    this.props.formActions.setIsProcessing(true);

    // attempt to authenticate with the given credentials...
    this.api.authenticate(
      this.refs.formEl.querySelector('[name=username]').value,
      this.refs.formEl.querySelector('[name=password]').value
    // update user state on successs
    ).then((user) => {
      this.props.formActions.setIsProcessing(false);
      this.props.userActions.setLoginStatus(true);
      this.props.userActions.setNameAndTitle(user.name, user.title);
      browserHistory.push(this.props.toRoute);
    // or report errors and disable form if incorrect
    }).catch((error) => {
      this.props.formActions.setIsProcessing(false);
      this.props.formActions.setMsg(error.msg);
      this.props.formActions.setValidity(false);

      ['username', 'password'].forEach((inputName) => {
        this.props.formActions.setInputMsg(inputName, error[inputName].msgWarning);
        this.props.formActions.setInputValidity(inputName, error[inputName].isValid);
      });
    });
  }

  /**
   * Render view.
   */
  render () {
    return (
      <form ref="formEl" action={this.props.form.toRoute}>
        <p>
          <em>Please sign in</em>
        </p>

        <InputField name="username" type="email" theme="light"
            isValid={this.props.form.username.isValid}
            msgHint="Your Username, for instance: name@example.com."
            msgWarning="Please enter a valid Username" />

        <InputField name="password" type="password" theme="dark"
            isValid={this.props.form.password.isValid}
            msgHint="The password you registered this account with."
            msgWarning="Please enter a valid password" />

        <div className="tray is-right">
          <p>{this.props.form.msg}</p>
          <Button label="Login" theme="dark"
              isProcessing={this.props.form.isProcessing}
              disabled={!this.props.form.isValid} />
        </div>
      </form>);
  }
}

export let LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginFormComponent);
