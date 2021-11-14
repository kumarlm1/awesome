import React from 'react';
import {
    View,Text,
    Image, StyleSheet
} from 'react-native';



import FilePicker from '../home/filepicker';

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
            <View style={{ flex:1 }}>
                <FilePicker />
            
            </View>
        );
    }
}