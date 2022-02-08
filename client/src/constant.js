const env = process.env.NODE_ENV || 'development';
const serverIP = 'localhost';
const serverPort = 3001;
export default {
    BASE_URL: `http://${serverIP}:${serverPort}/api`,
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken'
};


