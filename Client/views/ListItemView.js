import React from 'react';
import { FlatList, StyleSheet, Text, View, Image,Dimensions, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { fetchAllCourses, getAllCourses } from '../Redux/Actions/coursesAction';
import store from '../Redux/Stores/Store';
import { useEffect } from 'react';

import Ionicons from "react-native-vector-icons/Ionicons";

// const items = [
//     {
//         id: 1,
//         name: 'Sega Goods Evangelion - Mari MakinamiIllustrious ',
//         img: 'https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-meo-cute.jpg',
//         price: 812.917,
//         detail: 'perfect',
//         rating:5
//     },
//     {
//         id: 2,
//         name: 'Great Eastern Evangelion GE-52302 Rei Plugsuit Stuffed',
//         img: 'https://media.istockphoto.com/photos/funny-british-shorthair-cat-portrait-looking-shocked-or-surprised-picture-id1361394182?b=1&k=20&m=1361394182&s=170667a&w=0&h=cW_NDV-D-jrWBVcEPclIU9vRipFQZQC0armvGMN7w-c=',
//         price: 587.567,
//         detail: 'perfect',
//         rating:5

//     },
//     {
//         id: 3,
//         name: 'SEGA Evangelion: 3.0+1.0 Thrice Upon a Time LPM',
//         img: 'https://cdn-amz.woka.io/images/I/51cOOMq4fKL._SR200,200_.jpg',
//         price: 840.567,
//         detail: 'perfect',
//         rating:4

//     },
// ]

const ListItemView = ({
    navigation,
}) => {
    const db = useSelector(store=> store.courses)
    const dispatch=useDispatch();
    console.log(db)
    const [data,setData]=useState([]);  
    useEffect(()=>{
        dispatch(fetchAllCourses())
        // setData(db.courses)
        console.log(data)
    },[]
       
    )
    return (
        <ImageBackground source={{uri:'https://ktmt.vnmediacdn.com/stores/news_dataimages/nguyenthiluan/092019/24/14/in_article/1112_Anh_5.jpg'}}  
        resizeMode='cover' 
        style={styles.bgContainer}
    >
        <View>
            <Text style={styles.title}>Hồ Chí Minh</Text>
            <Text style={styles.title}>28| Trời nhiều mây</Text>
        </View>
        <View style={styles.ListItemContainer}>
            
            <FlatList
                data={db.courses}
                renderItem={ItemComponent}
                ListHeaderComponent={HeaderComponent}
                
            >

            </FlatList>
        </View>
        </ImageBackground>
    );
}
const HeaderComponent=()=>{
    return(
        <View>
        <View style={styles.headerListComponent}>
            <Ionicons style={{justifyContent:'center',alignSelf:'center',paddingTop:10}}
             name='time-outline'
            color='#fff'
            size={24}
             />
            <Text style={styles.headerComponetTitle}>
                  Dự báo hàng giờ
            </Text>
        </View>
        <View style={{flexDirection:'row',paddingBottom:10,opacity:0.6,paddingLeft:22,borderBottomWidth:1,borderBottomColor:'#fff', borderTopLeftRadius: 15, borderTopRightRadius: 15, backgroundColor: '#4fc3f7'}}>
        <Ionicons style={{justifyContent:'center',alignSelf:'center',paddingTop:10}}
         name='calendar-outline'
        color='#fff'
        size={24}
         />
         <Text style={styles.headerComponetTitle}>Dự báo 10 ngày</Text>
        </View>
        </View>
    )
}
const ItemComponent = ({ item }) => {
    return (
        <View style={styles.ItemComponent}>

            
            
            <View style={styles.ItemDetail}>
                <Text style={styles.nameTxt}>{item.day}</Text>
               <View style={styles.tempurate}>
               <Ionicons style={{justifyContent:'center',alignSelf:'center',paddingTop:10}}
                 name={item.icon}
                color='#fff'
                size={36}
             />
             <Text style={{opacity:0.6,fontSize:18,color:'#01579b'}}>{item.Doam}</Text>
               </View>
            <Text style={styles.do}>{item.Min}</Text>
            <View style={{marginTop:15,marginLeft:5,borderWidth:1,borderColor:'orange',width:50,height:5,borderRadius:20,backgroundColor:'orange'}}>

            </View >
            
            <Text style={styles.do}>{item.Max}</Text>

            </View>
        </View>
    )
}
export default ListItemView;
const width=Dimensions.get('window').width - 30;
const styles = StyleSheet.create({
    ListItemContainer: {
        flex: 1,
        
    },
    ItemComponent: {
        width:width ,
        backgroundColor:'#4fc3f7',
        opacity:0.6
    },
    imgItem: {
        width: 100,
        height: 100,
        borderRadius:20
    },
    ItemDetail: {
      paddingHorizontal:30,
        width:'100%',
        flexDirection:'row',
        borderBottomWidth:0.5,
        borderBottomColor:'#fff',
        marginTop:10
    },
    nameTxt: {
        color: '#fff',
        fontSize: 22,
        width:120,
        textAlign:'left'
    },
    priceTxt: {
        color: '#64b5f6',
        fontSize: 18
    },
    detailTxt: {
        color: 'black',
        fontSize: 15
    },
    rating:{
        color:'#f4511e'
    },
    headerComponetTitle:{
        color:'#fff',
        fontSize:20,
        paddingTop:13,
        paddingLeft:5
    },
    headerListComponent:{
        textAlign: 'center',
        flexDirection:'row',
        height:50,
        borderRadius:15,
        backgroundColor:'#000',
        paddingLeft:20,
        marginTop:20,
        marginBottom:30,
        opacity:0.3
    },
    bgContainer:{
        flex:1,
        alignItems:'center',
        height:'100%',
        padding:20,
    },
    title:{
        fontSize:30,
        color:'#fff',
        textAlign:'center'
    },
    tempurate:{
        paddingLeft:10,
        top:-15
    },
    do:{
        marginLeft:15,
        fontSize:20,
        color:'#ff6f00',
    }
});