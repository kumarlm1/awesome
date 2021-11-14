import React from 'react';
import {
    View,Text,
    ToastAndroid,
    Image, StyleSheet,Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Profile from '../user/profile';
import UserData from '../user/userdata';
import UserTabs from '../user/usertabs';

/////////////////////////////////////  styles //////////////////////////////////////////

const styless = StyleSheet.create({

    shadow: {
       shadowColor: '#7F5DF0',
     
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.75,
      shadowRadius: 5.5,
      elevation: 0,
    },
  });
  
  
  const TabBarStylesBasic =  StyleSheet.create({
    basic : {
      
    position : 'absolute',
    bottom : 5,
    left:5,
    right:5,
    elevation: 0,
    backgroundColor: '#ffe',
    // opacity: 0.6,
    borderRadius: 20,
    height: Dimensions.get('window').height/12,
    ...styless.shadow,
    },
    screenoptions : {
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
      
       
    }
    
  })


/////////////////////////////////////  Component //////////////////////////////////////////

const Tab = createBottomTabNavigator();
export default class AppHome extends React.Component {
     constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null,
            blur : false,
            profilereference : null
        };
        const heit = Math.max(Dimensions.get('window').height,Dimensions.get('window').width)/12;
        const Iconsize = heit/Math.min(Dimensions.get('window').height,Dimensions.get('window').width)*100
    }

    async componentDidMount() {
       
    }
    TabLongPress=({e,navigation,route})=>{
        alert('hi');
        
        //e.preventDefault();
        //navigation.navigate('Home');
    }
    reference = ref =>{
       this.setState({
        profilereference : ref}
        );
        
    }

    render() {
        
        return (
            
            <Tab.Navigator screenOptions={{
    
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarStyle: TabBarStylesBasic.basic,
                }}
                style={{ display:'none' }}
                
                
                >

            <Tab.Screen name="profiles" children={()=><UserData />} 
                                 options={{
                                     tabBarLabel: 'profile',
       
                                             tabBarIcon: ({ focused }) => (
                         <Icon name="cogs"   style={{    opacity: focused ? 1 : 0.2, color : focused ? '#900' : '#000' ,fontSize : focused ?  30  :  20  }} />
                         ),
                             }}/>
                 <Tab.Screen name="profile" component={UserData} 
                                 options={{
                                     tabBarLabel: 'profile',
       
                                             tabBarIcon: ({ focused }) => (
                         <Icon name="plus-circle"   style={{    opacity: focused ? 1 : 0.2, color : focused ? '#900' : '#000' ,fontSize : focused ?  30  :  20  }} />
                         ),
                             }}/>
                <Tab.Screen name="usertabs" children={()=><UserTabs blur={this.state.blur} refe={ this.reference } />} 
                        listeners={({ navigation, route }) => ({
                            tabLongPress: (e) => { 
                                ToastAndroid.show('Hide/show', ToastAndroid.SHORT);
                                this.state.profilereference !== null ? 
                                this.state.profilereference() :  
                                this.setState(prev=>({
                                    blur : !prev.blur
                                }))
                              },
                        })}
                        options={{ tabBarLabel: 'User',headerShown: false,
                            tabBarIcon: ({ focused }) => (<Icon name="user-circle"   style={{  opacity: focused ? 1 : 0.2,color : focused ? '#900' : '#000' , fontSize : focused ?  30  :  20   }} />
                                ),  
                            }}
                />
                 
                
            </Tab.Navigator>
        );
    }
}