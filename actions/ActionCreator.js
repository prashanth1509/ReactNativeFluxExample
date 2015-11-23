let {Dispatcher} = require('react-native-phrontend');
let Actions = require('./ActionTypes');

module.exports = {
    getProfile(params){
        Dispatcher.dispatch(Actions.GET_PROFILE, params);
    }
};