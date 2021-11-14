import React from 'react';
import {
    View,Text,Dimensions,
    ImageBackground, StyleSheet,FlatList,
    Pressable,
    Button,
    ToastAndroid,
    ActivityIndicator
} from 'react-native';
import storage from '@react-native-firebase/storage';
import { selectMultipleFile } from '../utils/filepicker';

import styles from './userdatastyles';
import FilePicker from '../home/filepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

export default class UserData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
                name: '',
                email: '',
                password: '',
                phone: '',
                images : [],
                isloading : true
                

            
        }
    }
    async componentDidMount() {
        
      
      
         
        
    }
   
    


    render() {
       
        return (
            <View style={styles.detailcontainers}>
                
          <FilePicker />
        
          </View>
        );
    }
}