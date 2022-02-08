import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../reducers'
import rootSagas from '../sagas'

const sagaMW = createSagaMiddleware()
const store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(sagaMW)))

sagaMW.run(rootSagas)

export default store