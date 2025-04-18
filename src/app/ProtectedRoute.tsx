import { Navigate } from 'react-router-dom';
import App from './App';

const ProtectedRoute = () => {
    const userId = localStorage.getItem('userId');
    return userId ? <App /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
