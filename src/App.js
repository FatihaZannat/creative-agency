import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createContext } from "react";
import MyNavbar from "./Components/Navbar/MyNavbar";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Orders from "./Components/Orders/Orders";
import Admin from "./Components/Admin/Admin";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import NotFound from "./Components/NotFound/NotFound";
import OrderProceed from "./Components/OrderProceed/OrderProceed";
import CheckOutProceed from "./Components/CheckOutProceed/CheckOutProceed";
import AddBook from "./Components/Admin/AddBook";
// import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [books, setBooks] = useState([]);
  const [userBooks, setUserBooks] = useState([]);
  const [allUsersBooks, setAllUsersBooks] = useState([]);
  const [userOrders, setUserOrders] = useState({});
  
  // console.log(books);
  return (
    <div className="m-0 p-0">
      <UserContext.Provider value={[loggedInUser, setLoggedInUser, books, setBooks, userBooks, setUserBooks, allUsersBooks, setAllUsersBooks, userOrders, setUserOrders]}>
        <Router>
          <Switch>
            <Route exact path="/">
              <MyNavbar/>
              <Home/>
            </Route>
            <Route path="/home">
              <MyNavbar/>
              <Home/>
            </Route>
            <Route path="/login">
              <MyNavbar/>
              <Login/>
            </Route>
            <Route path="/login?user=admin">
              <MyNavbar/>
              <Login/>
            </Route>
            {/* Private Route */}
            <PrivateRoute path="/order/:key">
              <MyNavbar/>
              <Orders/>
            </PrivateRoute>
            <PrivateRoute path='/admin/:key'>
              <Admin/>
            </PrivateRoute>
            <Route path='/order-proceed'>
              <MyNavbar/>
              <OrderProceed/>
            </Route>
            <Route path="/user-orders">
              <MyNavbar/>
              <CheckOutProceed orders={userOrders} />
            </Route>
            
            <Route path="/add-book">
              <MyNavbar/>
              <AddBook />
            </Route>

            <Route path='*/:page'>
              <NotFound/>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    
    </div>
  );
}

export default App;
