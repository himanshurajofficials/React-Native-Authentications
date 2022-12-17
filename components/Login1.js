/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Text,ToastAndroid, StyleSheet, View, TextInput, Button,SafeAreaView} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'registration2.db' });

const App11 = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [passwd, setPasswd] = useState('');

  const viewStudent = () => {
    console.log('button pressed');
    if (!phone) {
      ToastAndroid.show('Please fill phone number!', ToastAndroid.SHORT);
      return;
    }
    if (!passwd) {
      ToastAndroid.show('Please fill password!', ToastAndroid.SHORT);
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Register_Table1 where register_phone =? AND register_password=?',[phone,passwd],
        (tx1, results) => {
          console.log(results.rows.length);
          if (results.rows.length === 1){
            ToastAndroid.show('LogIn Successful', ToastAndroid.SHORT);
            navigation.navigate('home');
            console.log('login successful');
          } else {
            ToastAndroid.show('Invalid credentials', ToastAndroid.SHORT);
          }
        }
      );
    });
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <Text  style={styles.text111}> LogIn Form </Text>
      <View>
          <Text style={styles.text11}  >Phone Number : </Text>
        <TextInput keyboardType={'numeric'} style={styles.textInput11} onChangeText={newValue => setPhone(newValue)}
          placeholder="Enter Phone Number" />
          <Text style={styles.text11}>Enter your password</Text>
        <TextInput style={styles.textInput11} onChangeText={newValue => setPasswd(newValue)}
          secureTextEntry={true}
          placeholder="Password"
        />
        <View style={styles.space1}/>
         <Button style={styles.button} title="LogIn" onPress={() => viewStudent()}/>
        <View style={styles.space1}/>
        <Button style={styles.button} title="Create a account" onPress={() => navigation.popToTop()}/>
      </View>
      <View style={styles.space1}/>
      <Text>This app is made by Himanshu Raj</Text>
    </View>
    </SafeAreaView>
  );
};
export const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'lightBlue',
  },
  textInput11:{
    height: 36,
    width:280,
    borderColor:'black',
    borderWidth:2,
    margin:2,
    fontSize:13,
  },
  text11:{
    height: 20,
    color:'purple',
    margin:2,
    fontSize:16,
  },
  text111:{
    height:50,
    color:'purple',
    margin:2,
    fontSize:36,
  },
  button :{
    height: 20,
    color:'purple',
    margin:2,
    fontSize:16,

  },
  space1:{
    marginBottom:10,
    padding:5,
  },
});

export default App11;
