import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from './Loading';

const ProtectedRoute = ({ children }) => {
    const { user, status } = useSelector((state) => state.auth);
    const location = useLocation();

    if (status === 'loading') return <Loading />;

    return user ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;