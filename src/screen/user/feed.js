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
import { selectSingleFile ,uploadImageToStorage,listFilesAndDirectories,deleteFirebaseFile } from '../utils/filepicker';

import styles from './userdatastyles';
import FilePicker from '../home/filepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Feed extends React.Component {
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
        
        const reference =  storage().ref('kumar');

        await listFilesAndDirectories(reference).then((e) => {
          console.log('Finished listing------------------>',e);
          this.setState({
              images : e,
              isloading : false
          })
        });
         
        
    }
   
    


    render() {
        if (this.state.isloading ) {
            return <View style={{
              width: '100%',
              height: '100%'
            }}><ActivityIndicator style={{ color: '#000' }} size={'large'} /></View>;
          }
        return (
            <View style={styles.detailcontainers}>
                
           
                <FlatList 
                style={{ height:Dimensions.get('window').height, width:'100%' }}
                data={this.state.images}
                snapToAlignment="start"
                decelerationRate="fast"
                 showsVerticalScrollIndicator={false}
                 snapToInterval={Dimensions.get('window').height}
                
                renderItem={({item})=>(  
                   
                    <View style={{width : Dimensions.get('window').width,
                    height : Dimensions.get('window').height,}} > 

                    <ImageBackground  
                    source =   { { uri : item.url } }      
                    style = {styles.image}
                    
                    resizeMode='stretch'
                    
                    />
                    

                    <View style={styles.detailscontainer}>
                   
                   
                    <View style={{ margin:10  }}>
                        <TouchableOpacity onPress={()=>{ 
                            deleteFirebaseFile(item.name).
                            then(()=>{  
                                this.componentDidMount()
                                ToastAndroid.show('deleted',ToastAndroid.SHORT);
                                
                                  }) }}>
                            
                            <Icon name='delete' size={50} />
                            
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{ 
                            
                                this.componentDidMount()
                             }}>
                            
                            <Icon name='refresh-circle' size={50} />
                            
                            </TouchableOpacity>
                        
                        </View>
                
                    


                     <View style={styles.detailcontainer}>
                     <Text style={styles.title}>{item.name}</Text> 
                     <Text style={styles.des}>{item.created} </Text>
                    
                  </View>

                  
            
                    </View>


</View>



                    )}
                />
                
            
            </View>
        );
    }
}