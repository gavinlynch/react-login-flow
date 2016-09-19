import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

/**
 * Initial User state.
 * Used by main.js to create a composition app-level initialState from components.
 */
export let initialState = {
  activeUser: {
    name: undefined,
    title: undefined,
    loggedIn: false
  }
};

/**
 * Reducers for User state.
 * Used by main.js to create app-level reducers via combineReducers.
 */
export let reducers = {
  activeUser (state = initialState, action) {
    switch (action.type) {
    case 'SET_LOGIN_STATUS':
      return Object.assign({}, state, {
        loggedIn: action.loggedIn
      });
    case 'SET_NAME_AND_TITLE':
      return Object.assign({}, state, {
        name: action.name,
        title: action.title
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
  setLoginStatus: (status) => {
    return { type: 'SET_LOGIN_STATUS', loggedIn: status }
  },

  setNameAndTitle: (name, title) => {
    return { type: 'SET_NAME_AND_TITLE', name, title }
  }
};

/**
 * Reducer and Dispatch mapping, connecting Redux + React
 */
const mapStateToProps = (store) => {
  return store;
};

const mapDispatchToProps = (dispatch) => {
  return {
   userActions: bindActionCreators(actions, dispatch)
  }
}

/**
 * Composition component to add activeUser to utilizing classes.
 * Also allows routes to request authorization before accessing, which
 * is specified Route.requiresAuthorization in react-router.
 */
export let applyUserComposition = function (ChildComponent) {
  let ComposedComponent = class extends React.Component {
    static get displayName () {
      return 'UserComponent';
    }

    /**
     * Check authorization on component mounting
     */
    componentWillMount () {
      this.authorizationRedirect(this.props);
    }

    /**
     * Check authorization on component state update
     */
    componentWillReceiveProps (nextState) {
      this.authorizationRedirect(nextState, this.props);
    }

    /**
     * Force user to login page if un-authed user tries to request a page requiring authorization.
     * @param {Object} state The app state.
     * @param {Object} previousState The previous app state.
     */
    authorizationRedirect (state, previousState) {
      if (!state.route.requiresAuthorization) {
        return;
      }

      // if user has just logged out with this last state change, refresh the current page
      if (previousState && previousState.activeUser.loggedIn && !state.activeUser.loggedIn) {
        browserHistory.push(state.route.path);
      } else if (state.route.requiresAuthorization && !state.activeUser.loggedIn) {
        browserHistory.push('/not-authorized');
      }
    }

    render () {
      return <ChildComponent {...this.props} />;
    }
  };

  return connect(mapStateToProps, mapDispatchToProps)(ComposedComponent);
};
