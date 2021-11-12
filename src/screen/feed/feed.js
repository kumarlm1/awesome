import React , { useState } from "react";
import {View,Text,Image,StyleSheet,TouchableOpacity,ScrollView,TouchableWithoutFeedback} from "react-native";
import Video from "react-native-video";
import styles from "./styles";
const Feed = (props)=> {
    console.log(props.data.title);

   const [paused, setPaused] = useState(false)

   return(
  
            <View style={styles.container}>
                <TouchableWithoutFeedback
    onPress={()=>{ console.warn(props.data.title);setPaused(!paused)}} >

                <Video  style={styles.video}
               // source={{uri: props.data.sources[0]}}
                source={require('../ForBiggerMeltdowns.mp4')}
                onError={(e)=>{console.log(e)}}
                resizeMode="cover"
               poster =  'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' 
               posterResizeMode = "cover"
               paused={paused}
               
               fullscreen={true}
               
      /> 
        </TouchableWithoutFeedback>
        </View>
       

        )
    

}
export default Feed;
