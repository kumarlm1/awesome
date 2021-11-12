import React from 'react';
import Video from 'react-native-video';
import {
    View,
    Text,
    FlatList,
    Dimensions,
    VirtualizedList,
    TouchableWithoutFeedback
    ,StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native';

//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

    



import mediaJSON from '../feed/data.json'

import Appss from './videoview';

import Feed from '../feed/feed';
import FilePicker from './filepicker';
import styles from '../feed/styles';



const TopTab = createMaterialTopTabNavigator();

function createScreen({navigation}) {

 
return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'   }}>
      
      <Icon name="rocket" ></Icon>
        
    </View>
  );
}

function HomeScreen({navigation}) {
  navigation.addListener('tabLongPress', (e) => {
    // Prevent default behavior
    // e.preventDefault();
    
    alert('Long pressed');
  
  });

  // navigation.addListener('tabPress', (e) => {
  //   // Prevent default behavior
  //   // e.preventDefault();

  //   alert('Default behavior prevented');
  
  // });





  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'   }}>
      
      <Icon name="rocket" ></Icon>
      <GestureRecognizer
        onSwipe={(direction, state) => onSwipe(direction, state)}
        // onSwipeUp={(state) => onSwipeUp(state)}
        // onSwipeDown={(state) => onSwipeDown(state)}
        // onSwipeLeft={(state) => onSwipeLeft(state)}
        // onSwipeRight={(state) => onSwipeRight(state)}
        config={config}
        style={{
          flex: 1,
          backgroundColor: 'red',
         bottom:0,
          position: 'absolute',

        }}
        >
        <Text>sdsdc</Text>
        <Text>onSwipe callback received gesture: sdcsdc</Text>
      </GestureRecognizer>
        
    </View>
  );
}
function onSwipe(gestureName, gestureState) {
  const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
  
  switch (gestureName) {
    case SWIPE_UP:
      console.log('swipe up');
      break;
    case SWIPE_DOWN:
     console.log('swipe down');
      break;
    case SWIPE_LEFT:
      console.log('swipe left');
      break;
    case SWIPE_RIGHT:
      console.log('swipe right');
      break;
  }
}
const config = {
  velocityThreshold: 0.1,
  directionalOffsetThreshold: 80
}
function SettingsScreen() {

 
  return (
    
    <TopTab.Navigator>
      <TopTab.Screen name="Top home" component={HomeScreen} />
      <TopTab.Screen name="Top Settings" component={HomeScreen} />
    </TopTab.Navigator>
  );
}
const heit = Math.max(Dimensions.get('window').height,Dimensions.get('window').width)/12;
const Iconsize = heit/Math.min(Dimensions.get('window').height,Dimensions.get('window').width)*100
console.log(Dimensions.get('window'))

const Tab = createBottomTabNavigator();








const CustomTabBarButton = ({children,onPress,onLongPress}) =>{ 
  
  return(
  <TouchableOpacity
  style={{ 
    top : -10,
   
    justifyContent: 'center',
    alignItems: 'center',
    ...styless.shadow
  }} 
  onPress={onPress}
  onLongPress={onLongPress}
  >
    <View style={{
      width:50,
      height:50,
      borderRadius:20,
      backgroundColor:'green',
    }}>
      {children}

    </View>
  </TouchableOpacity>
)
  }



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
  }
  
})


function MyTabs() {
  const heit = Dimensions.get('window').height/12;
const Iconsize = heit/Dimensions.get('window').width*100
  return (
    
    <Tab.Navigator
    screenOptions={{
    
      tabBarHideOnKeyboard: true,
      tabBarShowLabel: false,
      tabBarStyle: TabBarStylesBasic.basic,
      }}
      >
        
      <Tab.Screen name="Home" component={HomeScreen} 
      options={{
        tabBarLabel: 'Home',
      
        tabBarIcon: ({ focused }) => (
          <GestureRecognizer
          onSwipe={(direction, state) =>{ console.log('swipped'); onSwipe(direction, state) }}
          config={config}
          style={{
           
            backgroundColor: 'red',
           
          }}
          >
          <Icon name="home"   style={{  opacity: focused ? 1 : 0.2,  color : focused ? '#900' : '#000' , fontSize : focused ?  Iconsize*2  :  Iconsize   }} />
          </GestureRecognizer>
          
        ),
      }}
      />


      <Tab.Screen name="settings" component={SettingsScreen}
      
       options={{
         tabBarStyle:{ ...TabBarStylesBasic.basic },
        tabBarLabel: 'Settings',
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Icon name="cogs"   style={{ opacity: focused ? 1 : 0.2,color : focused ? '#900' : '#000' , fontSize : focused ?  Iconsize*2  :  Iconsize   }} />
        ),
      }} />



      <Tab.Screen name="create" component={createScreen} 
       listeners={({ navigation, route }) => ({
        tabLongPress: (e) => {
          // Prevent default action
          //e.preventDefault();
    
          // Do something with the `navigation` object
          navigation.navigate('Home');
        },
      })}
     

       options={{
        tabBarVisible: false,
        tabBarLabel: 'Create',
        headerShown: false,
        
        tabBarIcon: ({ focused }) => (
          <Icon name="plus-circle"   style={{  opacity: focused ? 1 : 0.2,color : focused ? '#900' : '#000' , fontSize : focused ?  Iconsize*2  :  Iconsize   }} />
        ),
        tabBarButton: (props) => <CustomTabBarButton {...props} />
        
      }}/>



      <Tab.Screen name="feed" component={SettingsScreen} 
       options={{
        tabBarLabel: 'feed',
        
        tabBarBadge: 32,
       
        
      
        tabBarIcon: ({ focused }) => (
          <Icon name="rss"   style={{ opacity: focused ? 1 : 0.2,color : focused ? '#900' : '#000' , fontSize : focused ?  Iconsize*2  :  Iconsize  }} />
        ),
      }}/>



      <Tab.Screen name="profile" component={HomeScreen} 
       options={{
        tabBarLabel: 'profile',
       
        tabBarIcon: ({ focused }) => (
          <Icon name="user-circle"   style={{    opacity: focused ? 1 : 0.2, color : focused ? '#900' : '#000' ,fontSize : focused ?  Iconsize*2  :  Iconsize   }} />
        ),
      }}/>


    
    
    </Tab.Navigator>
    
   
  );
}





const Dummy = () => {
  console.log('dummy');
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Dummy text shown</Text>
        </View>
    );
};



import AppHome from './home';
const Home = () => {
    

    return (
       
      // <FlatList 
      
      //   data={mediaJSON.categories[0].videos}
      //   renderItem={({item}) =>   <Feed data={item}  />  }
      //   keyExtractor={(item, index) => index.toString()}
      //   snapToAlignment="start"
      //   decelerationRate="fast"
      //   showsVerticalScrollIndicator={false}
      //   snapToInterval={Dimensions.get('window').height}
        

      //     initialNumToRender={1}
      //     maxToRenderPerBatch={3}
      //     windowSize={2}
      //   />
        <NavigationContainer>

      <AppHome/>
      
    </NavigationContainer>
      // <NavigationContainer><FilePicker /></NavigationContainer>
      
    



    // <Feed data={mediaJSON.categories[0].videos[0]} />


   
        
        
        

    );

}
export default Home;