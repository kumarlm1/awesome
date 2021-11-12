import React from 'react';
import {
    View,Text,StyleSheet
} from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();


import Profile from '../../screen/user/profile';
import UserData from '../../screen/user/userdata';


///////////////////////////////// styles ///////////////////////////////
const TabBarBasicStyle = new StyleSheet.create({
    basic :  {
    tabBarLabelStyle: { fontSize: 12 },
    tabBarItemStyle: { width: 100 },
    tabBarStyle: { backgroundColor: 'powderblue' },
    tabBarHideOnKeyboard: true,
    }
  });

  /////////////////////////////////// Component /////////////////////////////////////

export default class UserTabs extends React.Component{
    constructor(props){
        super(props);
        this.state={
            activeTab:0
        }
    }

    render(){
        return(
            <Tab.Navigator >
            <Tab.Screen name="profile" component={Profile}  />
            <Tab.Screen name="userdata" component={UserData}  />
            </Tab.Navigator>
        )
    }
}

