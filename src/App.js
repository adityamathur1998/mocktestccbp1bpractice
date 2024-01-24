import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './Components/Home'
import CourseItemDetail from './Components/CourseItemDetail'
import NotFound from './Components/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={CourseItemDetail} />
    <Route exact path="not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
