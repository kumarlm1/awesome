import { StyleSheet,Dimensions } from "react-native";


 const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        
    },
    header : {
        top:Dimensions.get('window').height*0.1,
        alignItems: 'center',
        justifyContent: 'center',
        
  
    },
    loader:{
        position:'absolute',
         justifyContent: "center",
          alignItems: "center" 
    },
    avatar: {
        
        width: 100,
        height: 100,
        borderRadius: 15,
    },
    body:{
      position:'relative',  
    },
    username : {

        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    }
});


export default styles;