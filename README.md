# ReactNativeFluxExample
Example app demonstrating flux architecture in react native.

Read about [flux](https://facebook.github.io/flux).

<img src="http://tylermcginnis.com/wp-content/uploads/2015/04/Flux-Diagram-1024x853.png" width="600" alt="http://tylermcginnis.com/wp-content/uploads/2015/04/Flux-Diagram-1024x853.png">

## Install 

```sh
git clone git@github.com:prashanth1509/ReactNativeFluxExample.git
cd ReactNativeFluxExample
npm install
npm start
```

* Double click ios/ReactNativeFluxExample.xcodeproj and opens in Xcode
* Select ReactNativeFluxExample and click Run on Xcode
* Incase you get an exception during build saying */bin/sh failed at react-native-xcode.sh*
  * Add ```source ~/.bash_profile``` before line 45 (where react-native .. is called) at node_modules/react-native/packager/react-native-xcode.sh
* You can press cmd+cnt+x to enable remote debugging.

## About this example
* Uses flux architecture (View -> (Action)Dispatcher -> Store -> .. View)
* States are removed (and replaced with light weight internal state) and need not be specified when creating stores. 
* Fetch api (sync and async) see [Docs](https://facebook.github.io/react-native/docs/network.html)
* class syntax and functional components

## Walkthrough

App fetches from a server and updates view.

#### ActionTypes.js
Defining the action types.
```js

let Actions = Object.freeze({
    GET_PROFILE: 'GET_PROFILE',
    GET_PROFILE_SUCCESS: 'GET_PROFILE_SUCCESS',
    GET_PROFILE_FAILURE: 'GET_PROFILE_FAILURE'
});

module.exports = Actions;
```

#### ActionCreator.js
Lets create the action creators for the defined actions.
```js
let {Dispatcher} = require('react-native-phrontend');
let Actions = require('./ActionTypes');

module.exports = {
    getProfile(params){
        Dispatcher.dispatch(Actions.GET_PROFILE, params);
    }
};
```

#### Store.js
```js
let {Store} = require('react-native-phrontend');

let Actions = require('../actions/ActionTypes');

module.exports = Store.create({
   handler(payload){
       switch (payload.actionType) {
           case Actions.GET_PROFILE:

               let params = payload.data;
               let url = `http://echo.jsontest.com/name/${params.name}/age/${params.age}`;

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

           break;
       }
   }
});
```

#### Component.js

```js
var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} = React;

var TouchableWithoutFeedback = require('TouchableWithoutFeedback');

var Store = require('./Store');
var ActionCreator = require('./ActionCreator');
var Actions = require('./ActionTypes');

export default class extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      data: null,
    }
  }
  componentWillMount(){
      Store.subscribe(this.handleChange.bind(this) /*, this.handleError (optional) */);
  }
  componentDidMount() {
    ActionCreator.getProfile({
        name: 'everlasto',
        age: '20'
    });
  }
  handleChange(payload){
    switch(payload.actionType){
        case Actions.GET_PROFILE_SUCCESS:
            this.setState( {data: Store.get()} );
        break;
    }
  }
  componentWillUnmount() {
    // cleanup - unsubscribe from the store !important
    Store.unsubscribe();
  }
  render() {
    return (
      <View>
        <Text>{this.state.data}</Text>
      </View>
    ); 
  }
}
```


## Dependencies
* "react-native": "^0.14.2",
* "react-native-phrontend": "git+ssh://git@github.com/Flipkart/react-native-phrontend.git#v1"

Read about [react-native-phrontend](https://github.com/Flipkart/react-native-phrontend).
