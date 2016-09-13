import React from 'react';
import { applyUserComposition } from 'src/components/page';
import { LoginForm } from 'src/components/form';

class LoginPage extends React.Component {
  render () {
    return (
      <article id="page-login">
        <header>
          <a href="https://www.apple.com">
            <svg><use xlinkHref="/assets/sprites.svg#apple-logo"></use></svg>
          </a>
        </header>
        <section className="user-credentials">
          <LoginForm toRoute="/greetings"
              activeUser={this.activeUser}
              userActions={this.props.userActions} />
        </section>
      </article>);
  }
}

export default applyUserComposition(LoginPage);
