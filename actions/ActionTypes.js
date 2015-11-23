let keymirror = require('keymirror');

let Actions = Object.freeze(keymirror({
    GET_PROFILE: null,
    GET_PROFILE_SUCCESS: null,
    GET_PROFILE_FAILURE: null
}));

module.exports = Actions;