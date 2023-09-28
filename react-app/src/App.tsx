import './App.css'
import Login from './views/login/Login'
import Register from './views/register/Register'
import Dashboard from './views/dashboard/Dashboard'
import { Router, Switch, Route } from 'react-router-dom'
import history from './services/history'

function App() {

  return (
    <>
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Dashboard} />
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/filmes" component={Dashboard} />
        </Switch>
      </Router>
    </div>
    </>
  )
}

export default App
