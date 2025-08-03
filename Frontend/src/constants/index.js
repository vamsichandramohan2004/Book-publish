export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgotPassword',
    RESET_PASSWORD: '/auth/resetPassword/:token',
    UPDATE_PASSWORD: '/auth/updateMyPassword',
    UPDATE_ME: '/auth/updateMe',
    DELETE_ME: '/auth/deleteMe'
  },
  BOOKS: {
    BASE: '/books',
    REVIEWS: '/books/:bookId/reviews'
  },
  REVIEWS: {
    BASE: '/reviews'
  },
  USERS: {
    BASE: '/users'
  }
};

export const ROLES = {
  USER: 'user',
  AUTHOR: 'author',
  ADMIN: 'admin'
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  BOOKS: '/books',
  PROFILE: '/profile',
  ADMIN: '/admin'
};