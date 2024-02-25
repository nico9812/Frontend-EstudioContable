import { Navigate } from "react-router-dom";
import { useAuthContext } from "./authContext";
import Cookies from 'js-cookie';



export const PrivateRoute = ({children}) => {
    const group = Cookies.get('group');
    const token = Cookies.get('token');
    const {isAuthenticated} = useAuthContext();
    if (!isAuthenticated) {
        
        return <Navigate to='/login'/> ;
    }

    return children;
}

export const PrivateRouteConta = ({children}) => {
    const {isAuthenticated} = useAuthContext();
    const group = Cookies.get('group');
    const token = Cookies.get('token');

    if (token === undefined || token === '') {
        return <Navigate to='/logout'/> ;
    }

    if (!isAuthenticated) {
        
        return <Navigate to='/login'/> ;
    }

    if(group == "2"){
        return <Navigate to='/404'/> ;
    }

    return children;
}

export const PrivateRouteClient = ({children}) => {
    const {isAuthenticated} = useAuthContext();
    const group = Cookies.get('group');
    const token = Cookies.get('token');

    if (token === undefined || token === '') {
        return <Navigate to='/logout'/> ;
    }

    if (!isAuthenticated) {
        
        return <Navigate to='/login'/> ;
    }
    if(group == "1"){
        return <Navigate to='/404'/> ;
    }

    return children;
}

