import React from 'react';
import { useState } from 'react';
import {Platform,ImageBackground,Image, StyleSheet ,Text, TouchableOpacity, View ,TextInput} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteF, postFood, update } from '../Redux/Actions/coursesAction';
import {getStorage,uploadString,ref,getDownloadURL, uploadBytesResumable} from 'firebase/storage'

import * as ImagePicker from 'expo-image-picker'


const Edit = ({
    route
}) => {    
    const dispatch =useDispatch();
    const db=useSelector((store)=>store.courses);


    const {productId} = route.params;
    const {productImg} =route.params;
    const {productName} =route.params;
    const {productPrice}=route.params;
    const {productCId} = route.params;

    
    
    const [docId,setdocId]=useState(productId);

    const [CId,setCId]=useState(0);
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    
    const handleUpdate =(docId) => {
        let newFood = {
            cateID: CId,
            name: name,
            price: price,
            img: selectedImage.localURI,
        }
       
        dispatch(update(docId,newFood))
        navigation.navigate('ViewAll')
    }
    const del=(docId)=>{
       
        dispatch(deleteF(docId));
     navigation.navigate('ViewAll')
    }
    
        const [selectedImage, setSelectedImage]=useState({localURI:productImg})
        const openImage =async()=>{
            const result= await ImagePicker.launchImageLibraryAsync({base64:true})
            if(result.cancelled)
            return;
            // console.log(result)
            let uri = result.uri;
            setSelectedImage({localURI: result.uri})
            if(Platform.OS==='web'){
                let base64code =result.base64;
                //upload
                await uploadBase64(base64code)
            }else{
                let uri = result.uri;
                //step1 -> convert uri --> blob
                const blobFile= await convertURI2BlobFile(uri)
                //step2 --> upload to cloud
                await uploadFile(blobFile);
            }
        }
         const convertURI2BlobFile=async(uri)=>{
            const result= await new Promise((resolve,reject)=>{
                let xmlRequest = new XMLHttpRequest();
                xmlRequest.onload=function(){
                 resolve (  xmlRequest.response);
                }
                xmlRequest.onerror=function(){
                    console.log("error")
                }
                xmlRequest.responseType='blob';
                xmlRequest.open("GET",uri,true);
                xmlRequest.send(null)
            })
            return result;
         }
         const uploadFile=async(blobFile)=>{
            let imgname ='img-android-'+new Date().getTime();
            //step2
            let storage=getStorage();
            let storageRef=ref(storage,`Image/${imgname}.jpg`);
            let metadata={contentType:'image/jpeg'}
    
           const uploadTask= uploadBytesResumable(storageRef,blobFile,metadata);
           uploadTask.on("state_changed",
           (snapshot)=>{},
           (error)=>{},
           ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                console.log('downloadURL',downloadURL)
            })
           })
         }
        const uploadBase64=async(base64code)=>{
            let imgname ='img-w-'+new Date().getTime();
            //step2
            let storage=getStorage();
            let storageRef=ref(storage,`Image/${imgname}.jpg`);
            let metadata={contentType:'image/jpeg'}
            uploadString(storageRef,base64code,'base64',metadata).then((snapshot)=>{
                getDownloadURL(snapshot.ref).then((downloadURL)=>{
                    console.log('downloadURL',downloadURL)
                })
            })
        }
        
        
    return(
        
        <View style={styles.container}>
 <ImageBackground    source={{uri:'https://t4.ftcdn.net/jpg/03/78/97/59/360_F_378975954_G39M4ptXAjxKy80gbBIEo0wqBkk89gBF.jpg'}}  
        resizeMode='cover'
                
                style={styles.bgContainer}
            >
           
            <Image source={{uri:selectedImage.localURI}}
                style={styles.img}/>
                <TouchableOpacity  onPress={openImage}>
                    <Text>Choose Image</Text>
                </TouchableOpacity>

                    <View style={styles.inputContainer}>
                        <TextInput  placeholder={productName} style={styles.inputText} onChangeText={(val)=>setName(val)}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput  placeholder={productPrice}  style={styles.inputText} onChangeText={(val)=>setPrice(val)}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput  placeholder='Hình ảnh' style={styles.inputText} value={selectedImage.localURI}/>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={() => handleUpdate(docId)}>
                            <Text style={styles.btnTxt} >Lưu</Text>
                    </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => del(docId)}>
                         <Text style={styles.btnTxt} >Xóa</Text>
                </TouchableOpacity>
                </ImageBackground>
        </View>
               
           
        
    );
  }

export default Edit;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
       
    },
    title:{
        fontSize: 20,
        
    },
    img:{
        width:150,
        height:150,
        borderRadius:75
    },
    btn:{
        backgroundColor: '#d81b60',
        width: '70%',
        height: 45,
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 10,
        marginTop: 50,
    },
    inputContainer: {
        width: '70%',
        marginBottom: 10,
    },
    inputText: {
        borderBottomWidth: 2,
        borderBottomColor: '#d81b60',
        paddingVertical:10,
        flexWrap:'wrap',
        paddingLeft: 15,
    },
    bgContainer: {
        flex: 1,
        width:'100%',
        alignItems:'center'
    },
});