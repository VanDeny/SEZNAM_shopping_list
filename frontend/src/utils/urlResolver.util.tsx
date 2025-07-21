const BASE_URL = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://localhost:8080/shopping-list/' : 'https://probably-something-really-cool.com/';

export default BASE_URL;