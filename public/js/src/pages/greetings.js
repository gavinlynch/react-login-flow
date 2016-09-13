import React from 'react';
import { Link } from 'react-router';
import { applyUserComposition } from 'src/components/page';

import Button from 'src/components/button';

class GreetingsPage extends React.Component {
  /**
   * Set up events after view has mounted to DOM.
   */
  componentDidMount () {
    // when the user clicks the logout button
    this.refs.el.querySelector('button').addEventListener(
        'click', this.onClick.bind(this));
  }

  /**
   * Handle button click.
   */
  onClick () {
    this.props.userActions.setLoginStatus(false);
  }

  render () {
    return (
      <article ref="el" id="page-greetings" className="columns is-horizontal">
        <section className="user-profile column is-one-third columns">
          <h1 className="column">
            {this.props.activeUser.name}
          </h1>
          <div className="column">
            <a className="avatar" href="/user/">
              <img src="/assets/avatar.png" />
            </a>
          </div>
          <h2 className="column">
            {this.props.activeUser.title}
          </h2>
        </section>
        <section className="intro column is-two-thirds">
          <h1>Welcome!</h1>
          <h2>Greetings, human! :)</h2>
          <p>
            Lorem ipsum dolor sit amet, ex idque fabellas partiendo pri, ad veniam accusata
            inciderint eos. An per decore dolorem, ponderum facilisis in quo, quem accusata
            adipiscing te usu. Cum cu quod dicta menandri. Vix quem nobis ne, ei convenire
            accusamus moderatius cum.
          </p>
          <p>
            Ornatus tractatos sit an, cu pro summo iusto antiopam. Mel aperiri sensibus ea, dicta
            contentiones ut vim. Vis utroque insolens te, qui ei tale tacimates periculis. Saperet
            deleniti te usu, pro no dolore alienum, illud dicant dolorum ut vix. Meis nominati
            gubergren nam ut.
          </p>

          <div className="tray">
            <Button label="Logout" theme="dark" onClick={this.onClick} />
          </div>
        </section>
      </article>);
  }
}

export default applyUserComposition(GreetingsPage);
