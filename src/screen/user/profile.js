import React from 'react';
import {
    View,Text,
    Image, StyleSheet
} from 'react-native';



export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                zip: '',
                country: '',
               google_url: '',
               avatar: '',
               about: '',
            }}
    }

    componentDidMount() {
       
    }
    render() {
        return (
            <View>
                {/* <Image
        
          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        /> */}
        <Text> this is profile</Text>
            </View>
        );
    }
}