import React from 'react';
import {
    View,Text,
    Image, StyleSheet
} from 'react-native';



export default class UserData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: '',
                email: '',
                password: '',
                phone: '',

            }
        }
    }

    render() {
        return (
            <View >
               <Text>  This is User Data Page  </Text>
            </View>
        );
    }
}