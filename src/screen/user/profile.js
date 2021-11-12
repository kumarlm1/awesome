import React from 'react';
import {
    View,Text,
    Image, StyleSheet, TouchableOpacity,
    ToastAndroid,
    ActivityIndicator
} from 'react-native';
import * as Progress from 'react-native-progress';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';


import styles from './profilestyle';

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
               animating : true
            }}
      this.sheetRef = React.createRef();
    }

    renderContent = () => (
        <View
          style={{
            backgroundColor: 'red',
            padding: 16,
            height: 450,
          }}
        >
            <TouchableOpacity onPress={() => {this.showToast('pressed');this.changeAvatar(2)} }>
          <Text>Swipe down to close</Text>
          </TouchableOpacity>
        </View>
      );

      renderHeader = () => (
        <View
            style={{
                backgroundColor: 'red',
                padding: 16,
                height: 100,
            }}
        >
            <Text>Header</Text>
        </View>
        );


    changeAvatar = (val) => {
        this.sheetRef.current.snapTo(val)
    }


    componentDidMount() {
       
    }
    showToast(message) {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }
    stopAnimating(){
        this.setState(
            {
                animating : false
            }
        )
    }

  


    render() {
        return (
            <View style={styles.container}>
                 <BottomSheet
                    ref={this.sheetRef}
                    snapPoints={[400,100, 0]}
                    initialSnap={2}
                    borderRadius={10}
                    renderContent={this.renderContent}
                    renderHeader={this.renderHeader}
                    callbackNode={new Animated.Value(1)}
                    enabledGestureInteraction={true}
                   
                />
                <TouchableOpacity  onPress={() => this.changeAvatar(1) }>
                <View style={styles.header}>
               
                
                <Image style={styles.avatar} 
                    source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg'}}
                    onLoadStart={() => this.showToast('On load start')}
                    onLoadEnd={(e) => {this.stopAnimating()  }}
                    onError={(e) => {this.showToast('Error loading avatar');console.log(e.target) }}
                  
                    loadingIndicatorSource={require('../assets/loading.gif')}
                />
                
                <ActivityIndicator style={styles.loader} size="large" color="#00ff00" animating={this.state.animating} />
                </View>
                <View style={styles.header}>
                <Text style={styles.username}> this is profile</Text>
                </View>
               
                </TouchableOpacity>
               
                
        </View>
            
        );
    }
}