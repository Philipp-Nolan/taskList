const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const {
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_TIME,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_TIME,
} = require('../constants');

const signJWT = promisify(jwt.sign);
const verifyJWT = promisify(jwt.verify);


const tokenConfig = {
    access: {
        secret: ACCESS_TOKEN_SECRET,
        time: ACCESS_TOKEN_TIME,
    },
    refresh: {
        secret: REFRESH_TOKEN_SECRET,
        time: REFRESH_TOKEN_TIME,
    },
};

const createToken = async (payload, { time, secret }) => {
    const accessToken = await signJWT(
        {
            userId: payload.id,
            email: payload.email,
        },
        secret,
        { expiresIn: time },
    );

    return accessToken;
};

module.exports.createTokenPair = async payload => {
    return {
        access: await createToken(payload, tokenConfig.access),
        refresh: await createToken(payload, tokenConfig.refresh),
    };
};

const verifyToken = (token, { secret }) => verifyJWT(token, secret);

module.exports.decodeToken = token => jwt.decode(token);

module.exports.verifyRefreshToken = token =>
    verifyToken(token, tokenConfig.refresh);

module.exports.verifyAccessToken = token =>
    verifyToken(token, tokenConfig.access);
