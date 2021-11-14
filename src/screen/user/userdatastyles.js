
import { StyleSheet,Dimensions} from 'react-native';
const styles = StyleSheet.create({

    image : {
        width : Dimensions.get('window').width,
        height : Dimensions.get('window').height,
       
        position : 'absolute',
        alignItems : 'center',
    
     
    },
  
    container: {
     
      width : Dimensions.get('window').width,
      height : Dimensions.get('window').height,
      backgroundColor: '#fff',
      
    },
    detailcontainers: {
        width :Dimensions.get('window').width ,
        height : Dimensions.get('window').height,
        backgroundColor: '#fff'
      
   
    },
    detailscontainer: {
        width : Dimensions.get('window').width,
        height : Dimensions.get('window').height,
        alignItems:'flex-end',
        justifyContent :'flex-end',
        //marginBottom:'20%'
    },
    detailcontainer: {
        width : '100%',
       
        marginBottom : '25%',
        // justifyContent :'flex-end',
        // alignItems:'flex-end'
        
        
     
      },
    
  
    title : {
      fontSize : 20,
      fontWeight : 'bold',
      color:'green'
    },
    des :{
      fontSize : 10,
      color : 'red',
      fontFamily: "sans-serif"
    },
    btncontainer : {
        width :'100%' ,
        
        borderRadius : 20,
        

    },
    button : {
        fontSize : 40,
        width :'100%' ,
         alignItems : 'center',
         justifyContent : 'center',
         borderRadius : 20
    }
  
  
  });
export default styles;  