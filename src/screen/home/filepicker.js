// Example of File Picker in React Native
// https://aboutreact.com/file-picker-in-react-native/

// Import React
import React, {useState} from 'react';
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Button,
  Image,
  ToastAndroid,
} from 'react-native';
import { selectSingleFile ,uploadImageToStorage,listFilesAndDirectories } from '../utils/filepicker';

// Import Document Picker
import DocumentPicker from 'react-native-document-picker';

const FilePicker = () => {
  const [singleFile, setSingleFile] = useState(null);
  const [multipleFile, setMultipleFile] = useState([]);

  const selectOneFile = async () => {
    //Opening Document Picker for selection of one file
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        copyTo :'documentDirectory'
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(result));
      console.log('URI : ' + result[0].uri);
      console.log('Type : ' + result[0].type);
      console.log('File Name : ' + result[0].name);
      console.log('File Size : ' + result[0].size);
      //Setting the state to show single file attributes
      uploadImageToStorage(result[0].fileCopyUri,result[0].name,false,false).then(()=>{ ToastAndroid.show('uploaded',ToastAndroid.SHORT)  })
      setSingleFile(result[0]);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const selectMultipleFile = async () => {
    //Opening Document Picker for selection of multiple file
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
        copyTo :'documentDirectory'
        //There can me more options as well find above
      });
      for (const res of results) {
        //Printing the log realted to the file
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
        uploadImageToStorage(res.fileCopyUri,res.name,false,false).then(()=>{ ToastAndroid.show('uploaded',ToastAndroid.SHORT)  })
        
      }
      //Setting the state to show multiple file attributes
      setMultipleFile(results);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from multiple doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  return (
    <View style={{ flex:1  }}>
      <Text style={styles.titleText}>
        Example of File Picker in React Native
      </Text>
      <Button title="clear"  onPress={()=>{   setMultipleFile([]);setSingleFile(null)  }} ></Button>
      
      
      <View style={styles.container}>
        {/*To show single file attribute*/}
        <Button  title="single file" onPress={()=>{selectOneFile()}}></Button>
        {/*Showing the data of selected Single file*/}
        {  singleFile!== null ?
        <Text style={styles.textStyle}>
            
          File Name: { singleFile.name }
          {'\n'}
          Type: { singleFile.type }
          {'\n'}
          File Size: { singleFile.size }
          {'\n'}
          URI: {singleFile.uri}
          {'\n'}

          </Text>
          :
          <Text style={styles.textStyle}></Text>
        }
       
        {/*To multiple single file attribute*/}
        <Button title="Multiple file" onPress={()=>{selectMultipleFile()}}></Button>
        
        <ScrollView style={styles.scroll}>
          {/*Showing the data of selected Multiple files*/}
          {multipleFile.map((item, key) => (
            <View key={key}>
              <Text style={styles.textStyle}>
                File Name: {item.name ? item.name : ''}
                {'\n'}
                Type: {item.type ? item.type : ''}
                {'\n'}
                File Size: {item.size ? item.size : ''}
                {'\n'}
                URI: {item.uri ? item.uri : ''}
                {'\n'}
              </Text>
            </View>
          ))}
        </ScrollView>
        
      </View>
    </View>
  );
};

export default FilePicker;

const styles = StyleSheet.create({
  container: {
    padding:20,
  backgroundColor: '#fff',
    
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
   
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    
    color: 'black',
  },
 
  scroll:{
  
    padding:20,
    
  }
  ,
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
  imageIconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'stretch',
  },
});