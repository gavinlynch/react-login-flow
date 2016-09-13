import React from 'react';
import { Link } from 'react-router';

class NotAuthorizedPage extends React.Component {
  render () {
    return (
      <article id="page-not-authorized">
        <header>
          <a href="https://www.apple.com">
            <svg><use xlinkHref="/assets/sprites.svg#apple-logo"></use></svg>
          </a>
        </header>
        <h1>Sorry, you are not authorized to view this page :(</h1>
        <p>
          <Link to="/">Please login.</Link>
        </p>
      </article>);
  }
}

export default NotAuthorizedPage;
