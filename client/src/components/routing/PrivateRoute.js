import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
    <Route
        {...rest}
        render={
            (props) =>
                localStorage.getItem("authToken")
                    ? (<Component {...props} />)
                    : (<Redirect to="/login" />)
        }
    />
}

export default PrivateRoute;