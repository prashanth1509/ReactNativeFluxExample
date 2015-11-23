/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

let React = require('react-native');
let {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ActivityIndicatorIOS
    } = React;

let ProfileStore = require('./stores/ProfileStore');

let Actions = require('./actions/ActionTypes');
let ActionCreator = require('./actions/ActionCreator');

/*
const NameComponent = ({name = '_default'}) =>
    <View>
        <Text style={styles.name}>{name}</Text>
    </View>;

const AgeComponent = ({age}) =>
    <View>
        <Text style={styles.age}>{age}</Text>
    </View>;
*/

class ProfileComponent extends React.Component{

    render(){
        let {name, age} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.name}>Name: {name}</Text>
                <Text style={styles.age}>Age: {age}</Text>
            </View>
        )
    }
}
ProfileComponent.propTypes = { name: React.PropTypes.string.isRequired, age: React.PropTypes.number.isRequired };

class FluxExample extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            profileData: {
                name: null,
                age: 0
            }
        };
    }

    componentWillMount(){
        ProfileStore.subscribe(this.apiSuccess.bind(this), this.apiFailure.bind(this));
    }

    componentWillUnMount(){
        //Do not forget to unsubscribe
        ProfileStore.unsubscribe();
    }

    componentDidMount(){
        ActionCreator.getProfile({
            name: 'everlasto',
            age: '20'
        });
    }

    render(){
        if(this.state.loading)
            return <ActivityIndicatorIOS style={styles.container} animating={true} size="large" />;

        if(this.state.error) {
            return (
                <View style={[styles.container, {backgroundColor:'#FF0000'}]}>
                    <Text style={ {color: '#FFFFFF'} }>{'Some error had occured.'}</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <ProfileComponent name={this.state.profileData.name} age={parseInt(this.state.profileData.age)}/>
            </View>
        )
    }

    apiSuccess(payload){
        switch(payload.actionType){
            case Actions.GET_PROFILE_SUCCESS:
                this.setState( {profileData: ProfileStore.get(), loading: false} );
            break;
        }
    }

    apiFailure(errorPayload){
        switch(errorPayload.actionType){
            case Actions.GET_PROFILE_FAILURE:
                this.setState( {error: {src: errorPayload.data}, loading: false} );
                break;
        }
    }
}

let styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    name: {
        fontSize: 20,
        color: '#717171'
    },
    age: {
        fontSize: 12
    }
};

AppRegistry.registerComponent('ReactNativeFluxExample', () => FluxExample);
