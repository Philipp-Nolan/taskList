const { createTokenPair } = require('./jwtService')
const { MAX_DEVICES_AMOUNT } = require('../constants')

module.exports.createSession = async user => {
    const tokenPair = await createTokenPair(user)
    if ((await user.countRefreshTokens()) >= MAX_DEVICES_AMOUNT) {
        const [oldestToken] = await user.getRefreshTokens({
            order: [['updatedAt', 'ASC']],
            limit: 1,
        })
        await oldestToken.update({ value: tokenPair.refresh })
    } else {
        await user.createRefreshToken({ value: tokenPair.access })
    }
    return { tokenPair, user }
}


module.exports.refreshSession = async refreshTokenInstance => {
    const user = await refreshTokenInstance.getUser()
    const tokenPair = await createTokenPair(user)
    await refreshTokenInstance.update({ value: tokenPair.refresh })
    return { tokenPair, user }
}