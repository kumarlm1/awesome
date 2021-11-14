import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import ImageResizer from 'react-native-image-resizer';
const selectOneFile = async () => {
    let results = new Object();

    try {
      let res = await DocumentPicker.pick({
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
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res[0].uri);
      console.log('Type : ' + res[0].type);
      console.log('File Name : ' + res[0].name);
      console.log('File Size : ' + res[0].size);
      
      results.status = 200
     results.uri = res[0].uri 
     results.fileCopyUri = res[0].fileCopyUri
     results.filename = res[0].name
      
 
      
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        
        results.status = 400
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        results.status = 404
        throw err;
      }
    }
    return results; 
  };


  const selectMultipleFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      for (const res of results) {
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
      }
      
     // setMultipleFile(results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from multiple doc picker');
      } else {
      
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }

  }




 export const uploadImageToStorage  = async (path, name,compress,getUrl)=> {
      let Originalpath = ''
      let urls=null;
    if(compress){
     Originalpath = await compressImage(path) }
    else{
     Originalpath = 'file://'+String(path);
    }
    console.log(Originalpath)
    let reference = storage().ref('kumar/'+name)
    let task = reference.putFile(Originalpath);
    await task.then(async (e) => {
        let path = 'gs://'+ e.metadata.bucket + '/'+e.metadata.fullPath
        console.log('Image uploaded to the bucket!');
        if(getUrl){
        await reference.getDownloadURL()
        .then((url) => {
        //from url you can fetched the uploaded image easily
        console.log(url)
        urls = url
        })
        .catch((e) => console.log('getting downloadURL of image error => ', e));
      }

      
        
    }).catch((e) => {
       // status = 'Something went wrong';
        console.log('uploading image error => ', e);
     
     
    });
    return urls
}

export const deleteFirebaseFile = async (name)=>{
    let status = false;
    let imageRef = storage().ref('kumar/'+name);
    await imageRef
    .delete()
    .then(() => {
    console.log(`${name}has been deleted successfully.`);
    status = true
    })
     .catch((e) => console.log('error on image deletion => ', e));
    return status
}

export const compressImage = async(imageUri) => {
let newWidth = 40;
let newHeight = 40;
let compressFormat = 'PNG';
let quality = 100;
let rotation = 0;
let outputPath = null;
let url=null;
await ImageResizer.createResizedImage(
  imageUri,
  newWidth,
  newHeight,
  compressFormat,
  quality,
  rotation,
  outputPath,
)
  .then((response) => {
    // response.uri is the URI of the new image that can now be displayed, uploaded...
    //resized image uri
    let uri = response.uri;
    //generating image name
    let imageName = 'new' + imageName;
    //to resolve file path issue on different platforms
    let uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    //setting the image name and image uri in the state
    url = uploadUri
    console.log(uploadUri);
  })
  .catch((err) => {
    console.log('image resizing error => ', err);
  });
  return url
}
export async function listFilesAndDirectories(reference, pageToken,lists=[]) {
  return reference.list({ pageToken }).then(async result => {
    // Loop over each item
    await Promise.all( result.items.map(async ref => {

     
       let refe =  storage().ref(ref.fullPath)
       
     return  await refe.getDownloadURL()
                  .then( async (url) => {
                  //from url you can fetched the uploaded image easily
                  await refe.getMetadata().then((data)=>{
                    lists.push(
                      { name:data.name,
                        created : data.timeCreated,
                        updated : data.updated,
                        url:url});
                       })
                 
                  
                  })
                  .catch((e) => console.log('getting downloadURL of image error => ', e));
       // return Promise.resolve();
      
    })
    );

    if (result.nextPageToken) {
      return listFilesAndDirectories(reference, result.nextPageToken);
    }

    return Promise.resolve().then(()=>{  return lists  });
  }); 
}

// export async function listFilesAndDirectories(reference, pageToken  ) {
//     let  resultslist = []
//     let refe = null
//     await reference.list({ pageToken }).then( async (result) => {
//         // Loop over each item 
//         await result.items.forEach(async (ref) => {
//             refe =  storage().ref(ref.fullPath)
//             let uurl = null
//             await refe.getDownloadURL()
//             .then( (url) => {
//             //from url you can fetched the uploaded image easily
//             console.log(url)
//             uurl = url
//             })
//             .catch((e) => console.log('getting downloadURL of image error => ', e));
//             resultslist.push(uurl) 
//         });
//         //  while(result.nextPageToken){
//         //     await reference.list({ pageToken }).then( async (result) => {
//         //       // Loop over each item 
//         //       await result.items.forEach(async (ref) => {
//         //         refe = storage().ref(ref.fullPath)
//         //         await refe.getDownloadURL()
//         //         .then((url) => {
//         //         //from url you can fetched the uploaded image easily
//         //         console.log(url)
//         //         resultslist.push(url)
//         //         })
//         //         .catch((e) => console.log('getting downloadURL of image error => ', e));
//         //       });
//         //     })
//         // } 

//       })
   

//         console.log('--------------------------',resultslist)
//         return resultslist
         
      
         
      
        
// }
      
     


export const selectSingleFile = async()=>{
   
   let result = await selectOneFile();
    
    if (result.status === 200 ) {
        return result
    }
    else{  
        return null
      }
    


  }

