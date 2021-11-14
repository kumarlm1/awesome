import React from 'react';
import {
    View,Text,Button,
    Image, StyleSheet, TouchableOpacity,
    ToastAndroid,
    ActivityIndicator,Dimensions
} from 'react-native';
import * as Progress from 'react-native-progress';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Icon from "react-native-vector-icons/Ionicons";
import { BlurView } from "@react-native-community/blur";
import storage from '@react-native-firebase/storage';

import UploadScreen from './uploadscreen';
import styles from './profilestyle';
import { selectSingleFile ,uploadImageToStorage,listFilesAndDirectories } from '../utils/filepicker';
import { FlatList } from 'react-native-gesture-handler';
export default class Profile extends React.Component {
    constructor(props) {
        super(props);
     
        this.state = {
         
                name: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                zip: '',
                country: '',
               google_url: 'content://com.android.providers.media.documents/document/image%3A121682',
               avatar: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg',
               about: '',
               animating : true,
               isBlurred : this.props.blur,
               isUploading : false,
               images : [1,2,3,4,5]
            }
      this.sheetRef = React.createRef();
      this.fall = new Animated.Value(1);
      this.position = new Animated.Value(1);
      this.BOTTOMSHEETPOSITION ={
          HIDDEN : 2,
          PARTIALLY : 1,
          VISIBLE : 0
      }
      this.homereference=()=>{
       this.setState(prev=>({
           isBlurred : !prev.isBlurred
       })) }

      this.props.refe(this.homereference)
    }

    renderContent = () => (
        <View
        style={{
            backgroundColor: 'white',
            padding: 16,
            height: '100%',
        }}>
              
         <View style={styles.buttonview}>
            <Button style={styles.button} title="Upload" color="#f194ff"
                onPress={() => this.changeAvatarUri()}
            />
        </View>
        <View style={styles.buttonview}>
            <Button style={styles.button} title="Cancel" color="#f194ff"
                onPress={() => this.changeBottomSheetPosition(this.BOTTOMSHEETPOSITION.HIDDEN)}
            />
        </View>
        <ActivityIndicator style={{   justifyContent:'center', alignItems:'center' }} 
               size="large" color="#00ff00" animating={this.state.isUploading} />
       
        
    </View>
      );

      renderHeader = () => (
        <View
            style={{
                
                padding: 16,
                height: 60,
                justifyContent:'center',
                alignContent:'center',
                alignItems:'center'
            }}
        >
            <TouchableOpacity onPress={()=>{console.log('closed');this.changeBottomSheetPosition(this.BOTTOMSHEETPOSITION.HIDDEN)}}>
            <Icon name='md-caret-down-circle' size={20} />
            </TouchableOpacity>
           
        </View>
        );

   

    
    changeAvatarUri = async ()=>{
        let  result = null , url; 
        result = await selectSingleFile()
        this.setState({
            isUploading : true
        })
        url = await uploadImageToStorage(result.fileCopyUri,result.filename,false,true)
        if(url !== null && result !== null) {

      
            this.setState({
                avatar : url,
                isUploading : false
            }
            ,
            this.changeBottomSheetPosition(this.BOTTOMSHEETPOSITION.HIDDEN)
            )
        
    }
    else {
        ToastAndroid.show('error uploading',ToastAndroid.SHORT,ToastAndroid.CENTER)
        this.setState({
            isUploading : false
        },this.changeBottomSheetPosition(this.BOTTOMSHEETPOSITION.HIDDEN)
        )
       
    }
        
    }    

    changeAvatar = (val) => {
        this.changeBottomSheetPosition(val)
    }

    changeBottomSheetPosition = (val) => {
        this.sheetRef.current.snapTo(val)
    }


    async componentDidMount1() {
        
        const reference =  storage().ref('kumar');

        await listFilesAndDirectories(reference).then((e) => {
          console.log('Finished listing------------------>',e);
        });
         
        
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
    startAnimating(){
        this.setState(
            {
                animating : true
            }
        )
    }
   
   
  


    render() {
        
        return (
            //<UploadScreen />
            <View style={styles.container}>
                
               <ActivityIndicator style={{  top:Dimensions.get('window').height/2, justifyContent:'center', alignItems:'center' }} 
               size="large" color="#00ff00" animating={this.state.isUploading} />
                 <BottomSheet
                    ref={this.sheetRef}
                    snapPoints={['60%','30%', 0]}
                    initialSnap={this.BOTTOMSHEETPOSITION.HIDDEN}
                    borderRadius={20}
                    renderContent={this.renderContent}
                    renderHeader={this.renderHeader}
                    callbackNode={this.fall}
                    contentPosition={this.position}
                    enabledContentTapInteraction={false}
                    enabledBottomInitialAnimation={true}
                    // onOpenStart={()=>{console.log('open start')}}
                    // onOpenEnd={()=>{console.log('open start')}}
                    // onCloseEnd={()=>{console.log('open start')}}
                />
                
                <Animated.View style={{ opacity : Animated.add(0.1,Animated.multiply(this.fall,1.0)) }}>
                <TouchableOpacity  onPress={() => this.changeAvatar(0) }>
                <Animated.View style={styles.header}>
               
               
                <Image style={styles.avatar} 
                    source={{uri: this.state.avatar}}
                
                    onLoadStart={() => this.startAnimating()  }
                    onLoadEnd={(e) => {this.stopAnimating()  }}
                    onError={(e) => {this.showToast('Error loading avatar');console.log(e.target) }}
                  
                    loadingIndicatorSource={require('../assets/loading.gif')}
                />
                 
                <ActivityIndicator style={styles.loader} size="large" color="#00ff00" animating={this.state.animating} />
                </Animated.View>
                </TouchableOpacity>
                <View style={styles.header}>
                <Text style={styles.username}> this is profile</Text>
               
                
                </View>
              
               
                </Animated.View>
                { this.state.isBlurred ?
                <BlurView
                    key={11}
                    style={styles.absolute}
                    blurType="light"
                    blurAmount={10}
                />

                :
                <View></View>

                }

               
               
               
        </View>
        
            
        );
    }
}