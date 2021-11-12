import React from 'react';
import {
    View,Text,
    Image, StyleSheet,Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



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
        };
        const heit = Math.max(Dimensions.get('window').height,Dimensions.get('window').width)/12;
        const Iconsize = heit/Math.min(Dimensions.get('window').height,Dimensions.get('window').width)*100
    }

    async componentDidMount() {
       
    }
    TabLongPress=({e,navigation,route})=>{
        alert(navigation.state.routeName);
        
        //e.preventDefault();
        //navigation.navigate('Home');
    }

    render() {
        return (
            <Tab.Navigator screenOptions={{
    
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarStyle: TabBarStylesBasic.basic,
                }}>
                <Tab.Screen name="usertabs" component={UserTabs} 
                        listeners={({ navigation, route }) => ({
                            tabLongPress: (e) => { this.TabLongPress(e, navigation, route) },
                        })}
                        options={{ tabBarLabel: 'User',headerShown: false,
                            tabBarIcon: ({ focused }) => (<Icon name="plus-circle"   style={{  opacity: focused ? 1 : 0.2,color : focused ? '#900' : '#000' , fontSize : focused ?  30  :  20   }} />
                                ),  
                            }}
                />
                 <Tab.Screen name="profile" component={UserTabs} 
                                 options={{
                                     tabBarLabel: 'profile',
       
                                             tabBarIcon: ({ focused }) => (
                         <Icon name="user-circle"   style={{    opacity: focused ? 1 : 0.2, color : focused ? '#900' : '#000' ,fontSize : focused ?  30  :  20  }} />
                         ),
                             }}/>
            </Tab.Navigator>
        );
    }
}