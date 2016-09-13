# React Login Flow
A React/Redux ES6 login example,
by gavin.b.lynch@gmail.com

***

Bucket o' tech used:
- `Node.js` with `Grunt` tooling and `Webpack` + `Babel`
- `Bower` with an example of integrating legacy UI plugins like jQuery
- `React` + `Redux` + `React-Router`, with an example of composition with React components
- `SASS` + `PostCSS`, with SVG sprites for scalable and CSS-styled assets and a typography-based `responsive` scheme (REM in conjunction with ViewportWidth + @media queries)

## Installation
Clone the repository or unzip the project. Navigate to the root of the project and run:

```sh
$ npm install
$ npm start
```

Navigate to [localhost:8080](http://localhost:8080/) to open the app.

## Usage

To [log in](http://localhost:8080/), use one of the user/pass combinations from the [credentials.json](http://localhost:8080/credentials.json) file served by the app. For example:

| Username      | Password      |
| --------------|:-------------:|
| ada.lovelace  | algorithm     |

The app consistent of three main views:
- [Login/Index view](http://localhost:8080/): The app index, presents the user with a typical login form.
- [Not Authorized view](http://localhost:8080/not-authorized): A splash page warning the user they are not authorized to view the content they were seeking.
- [Greetings view](http://localhost:8080/greetings): An authorization-protected URL, which shows some dummy info to the user. This is only reachable if the `activeUser.loggedIn` property is set to True.

# TODO
Everything? A few things left to do...

- Persist state to storage
- Real authentication
- Authentication logging via middleware
- Move route/browser history to state maybe?
- Speaking of the routing, is react-route really the best option these days?
- Is there a better way to intecept for authorization using Middleware?
- If this was a proper app, we would want to add deployment packaging and make sure the resources are all concat'd and uglify'd up properly
