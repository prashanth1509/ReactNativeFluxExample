let {Store} = require('react-native-phrontend');

let Actions = require('../actions/ActionTypes');

let ApiConfig = require('../config/ApiConfig');

module.exports = Store.create({
   handler(payload){
       switch (payload.actionType) {
           case Actions.GET_PROFILE:

               let params = payload.data;
               let url = ApiConfig.GET_PROFILE_API + `/name/${params.name}/age/${params.age}`;

               //Fetch api documentation https://facebook.github.io/react-native/docs/network.html
               fetch(url)
                   .then((responseBody) => {
                       //This block you will have access to responseBody, headers, statusCode
                       if(responseBody.status != 200)
                            throw new Error('Status code is non 200');
                       return responseBody.json();
                   })
                   .catch((error) => {
                       this.emitError({actionType: Actions.GET_PROFILE_FAILURE, error: error});
                   })
                   .then((response) => {
                       this.set(response); // or this.set(this.parse(response)) to perform validation.
                       this.emitChange({actionType: Actions.GET_PROFILE_SUCCESS});
                   }).done();

               /*
                // Async style, but currently buggy as this function is subjected to bind at Store.js
                try {
                    let response = await fetch(url);
                    let data = await response.json();
                    this.set(data); // or this.set(this.parse({name: 'tony', age: 40})) to perform validation.
                    this.emitChange({actionType: Actions.GET_PROFILE_SUCCESS});
                } catch(error) {
                    this.emitError({actionType: Actions.GET_PROFILE_FAILURE, error: error});
                }
                */

           break;
       }
   }
});