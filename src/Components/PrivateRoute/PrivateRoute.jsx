import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute = ({children, ...rest}) => {
    const [loggedInUser] = useContext(UserContext);
    // console.log(loggedInUser.userType);
    // console.log(rest);
    // const user = loggedInUser.userType;
    const adminLocation = rest.computedMatch.params.key;
    // console.log(adminLocation);
    
    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedInUser.email 
                ? ( children )  
                : (
                <Redirect
                    to={{
                        pathname: `/login${ adminLocation=== "admin" ? "?user=admin" : ""}`,
                        state: { from: location }
                    }}
                />
                )
            }
        />
    );
};

export default PrivateRoute;