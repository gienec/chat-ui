import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router-dom'
import { injectGlobal } from 'emotion'
import history from './common/history'
import Chat from './containers/Chat'
import Authenticate from './containers/Authenticate'

injectGlobal`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
   
  html, body {
    /* Prevent body from scrolling  */
    height: 100%;
    overflow: hidden
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont;
    background-color: #E9EDF6;
  }
`

const App = () => (
  <Router history={history}>
    <div>
      <Route
        path="/"
        render={() => {
          return <Chat />
        }}
      />
      <Route path="/authenticate" component={Authenticate} />
    </div>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'))
