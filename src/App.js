import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import AuthProvider from './context/AuthProvider';
import Register from './Pages/Register/Register';
import Dashboard from './Pages/Dashboard/Dashboard';
import Product from './Pages/Product/Product';
import PrivateRoute from './Router/PrivateRoute';
import AddReview from './Pages/AddReview/AddReview';
import Order from './Pages/Order/Order';
import Payment from './Pages/Payment/Payment';
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
        <Switch>
          <Route exact path='/' >
            <Home></Home>
          </Route>
          <Route path='/home' >
            <Home></Home>
          </Route>
          <Route path='/properties' >
            <Product></Product>
          </Route>
          <PrivateRoute path='/addreview' >
            <AddReview></AddReview>
          </PrivateRoute>
          <PrivateRoute path='/order'>
            <Order></Order>
          </PrivateRoute>
          <PrivateRoute path='/payment'>
            <Payment></Payment>
          </PrivateRoute>
          <Route path='/login' >
            <Login></Login>
          </Route>
          <Route path='/signup' >
            <Register></Register>
          </Route>
          <PrivateRoute path='/dashboard' >
            <Dashboard></Dashboard>
          </PrivateRoute>
          </Switch>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
