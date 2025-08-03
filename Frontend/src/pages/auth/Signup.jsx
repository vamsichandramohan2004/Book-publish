import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useAuth } from '../../hooks/useAuth';
import Spinner from '../../components/spinner';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const { register, loading } = useAuth();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            enqueueSnackbar('Passwords do not match', { variant: 'error' });
            return;
        }

        try {
            await register({ username: name, email, password });
            navigate('/');
            enqueueSnackbar('Registration successful!', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 min-h-screen flex items-center justify-center">
            <div className="flex flex-col border border-gray-200 rounded-xl w-full max-w-md p-6 bg-white shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 my-4 text-center">Sign Up</h1>
                {loading ? <Spinner /> : null}
                <form onSubmit={handleSubmit}>
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-700 font-medium mb-2 block">Username</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
                            required
                        />
                    </div>
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-700 font-medium mb-2 block">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
                            required
                        />
                    </div>
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-700 font-medium mb-2 block">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
                            required
                            minLength="8"
                        />
                    </div>
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-700 font-medium mb-2 block">Confirm Password</label>
                        <input
                            type="password"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
                            required
                            minLength="8"
                        />
                    </div>
                    <button
                        type="submit"
                        className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Sign Up'}
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Already have an account?
                        <Link to="/login" className="text-blue-600 hover:text-blue-800 ml-1">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
