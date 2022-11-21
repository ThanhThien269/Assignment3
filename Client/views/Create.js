import {Platform, ImageBackground, StyleSheet ,Text, TouchableOpacity, View ,TextInput} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { postFood } from '../Redux/Actions/coursesAction';
import {getStorage,uploadString,ref,getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import { useState } from 'react';

import * as ImagePicker from 'expo-image-picker'
import Ionicons from "react-native-vector-icons/Ionicons";

const Create = ({
    navigation,
}) => {
    const dispatch =useDispatch();
    const db=useSelector((store)=>store.courses);
    const [cateID,setcateID] = useState(0);
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [img,setImage] = useState('');
    // const[state,setState]=useState({
    //     // pdid:"",
    //     name:"",
    //     price:"",
    //     img:"",
    //     cateID:1,
    // })
    // const handleChangeText = (name,value)=>{
    //     setState({...state,[name]:value})
    // }
    const  save=()=>{
            let newFood = {
            cateID: cateID,
            name: name,
            price: price,
            img: selectedImage.localURI,
        }
        dispatch(postFood(newFood));
        navigation.navigate('ViewAll');
    }
    const [selectedImage, setSelectedImage]=useState({localURI:''})
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
        <View style={styles.loginContainer}>
            <ImageBackground    source={{uri:'https://i.pinimg.com/originals/2e/e9/18/2ee918427712255bc116749e33616d33.png'}}  
        resizeMode='cover'
                
                style={styles.bgContainer}
            >
                <View style={styles.logoLogin}>
                    <Ionicons name='create' color='#FFF' size={36}/>
                </View>
                <Text style={styles.signinText}>    
                    Thêm món ăn
                </Text>
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput  placeholder='ID danh mục' style={styles.inputText} onChangeText={(val)=>setcateID(val)}/>
                    </View>
                    {/* check val */}
                    <View style={styles.inputContainer}>
                        <TextInput  placeholder='Tên sản phẩm' style={styles.inputText} onChangeText={(val)=>setName(val)}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput  placeholder='Giá tiền' style={styles.inputText} onChangeText={(val)=>setPrice(val)}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput  placeholder='Hình ảnh' style={styles.inputText} value={selectedImage.localURI}/>
                        <TouchableOpacity style={styles.btn} onPress={openImage}>
                            <Text style={{color:'white'}}>Chọn tệp hình ảnh</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={() => save()}>
                        <Text style={styles.btnTxt} >Thêm món ăn</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}
export default Create;
const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
    },
    logoLogin: {
        width: 60,
        height: 60,
        borderRadius: 60/2,
        backgroundColor: '#d81b60',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    }, 
    signinText: {
        color: '#d81b60',
        fontSize: 30,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginTop: 10,
        color: '#FFF',

    },
    formContainer: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
    inputContainer: {
        width: '70%',
        marginBottom: 10,
    },
    inputText: {
        borderBottomWidth: 2,
        borderBottomColor: '#d81b60',
        paddingVertical:10,
        color: '#FFF',
        paddingLeft: 15,
        fontSize: 14
    },
    btn: {
        backgroundColor: '#d81b60',
        width: '70%',
        height: 45,
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 10,
        marginTop: 50,
    },
    btnTxt: {
        color: '#FFF'
    },
    bgContainer: {
        flex: 1,
        alignItems: 'center',

    },

});