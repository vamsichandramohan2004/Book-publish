import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, logoutUser, getCurrentUser } from '../utils/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Initial state is true
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user = await getCurrentUser();
                setUser(user);
            } catch (error) {
                // If there's an error (e.g., no token), the user is not authenticated
                setUser(null);
            } finally {
                // This is the most critical part: loading must be set to false
                // after the check, regardless of success or failure.
                setLoading(false);
            }
        };
        checkAuth();
    }, []); // Empty dependency array ensures this runs only once on mount

    const login = async (email, password) => {
        setLoading(true);
        try {
            const user = await loginUser(email, password);
            setUser(user);
            return true;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        try {
            const user = await registerUser(userData);
            setUser(user);
            return true;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await logoutUser();
            setUser(null);
            navigate('/login');
        } catch (error) {
            // In case of a logout error, still set user to null and navigate
            setUser(null);
            navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
