/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState ,useEffect } from 'react';
import {Text, StyleSheet, View, TextInput, Button , ToastAndroid, SafeAreaView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { openDatabase } from 'react-native-sqlite-storage';
const db = openDatabase({ name: 'registration2.db' });

const App = ({navigation}) => {
  const [gender, setGender] = useState('');
  const [name1, setName1] = useState('');
  const [phone1, setPhone1] = useState('');
  const [age, setAge1] = useState('');
  const [passwd1, setPasswd1] = useState('');
  const [email1, setEmail1] = useState('');

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='Register_Table1'",
        [],
        function (tx, res) {
            // console.log(tx);
            console.log('item:', res.rows.length);
          if (res.rows.length === 0) {
            txn.executeSql('DROP TABLE IF EXISTS Register_Table1', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS Register_Table1(register_id INTEGER PRIMARY KEY AUTOINCREMENT,register_name VARCHAR(30),register_age INT(15),register_gender VARCHAR(30), register_phone INT(15),register_email VARCHAR(255) ,register_password VARCHAR(200))',
              []
            );
          }
        }
      );
    });
  }, []);
  const insertData = () => {
    console.log('button pressed');
    if (!name1) {
      ToastAndroid.show('Please fill name!', ToastAndroid.SHORT);
      return;
    }
    if (!age) {
      ToastAndroid.show('Please fill age!', ToastAndroid.SHORT);
      return;
    }
    if (!phone1) {
      ToastAndroid.show('Please fill phone number!', ToastAndroid.SHORT);
      return;
    }
    if (!email1) {
      ToastAndroid.show('Please fill email!', ToastAndroid.SHORT);
      return;
    }
    if (!passwd1) {
      ToastAndroid.show('Please fill password!', ToastAndroid.SHORT);
      return;
    }
    db.transaction(function (tx) {
        console.log(name1 + " " + " " + age + " " + gender + " " + phone1 + " " + email1 + " " + passwd1);
      tx.executeSql(
        'INSERT INTO Register_Table1(register_name,register_age,register_gender,register_phone,register_email,register_password) VALUES (?,?,?,?,?,?)',
        [name1,age,gender,phone1,email1,passwd1],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          console.log(tx);
          if (results.rowsAffected > 0) {
            ToastAndroid.show('User Created Successfully!', ToastAndroid.SHORT);
            navigation.navigate('home');
          } else {
            ToastAndroid.show('Please fill age!', ToastAndroid.SHORT);}
        }
      );
    });
    viewStudent();
  };
  const viewStudent = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Register_Table1 ',
        [],
        (tx1, results) => {
          let temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            {temp.push(results.rows.item(i));
            // console.log(results.rows.item(i));
          }
          console.log(temp);
        //   console.log(tx1);
        }
      );
    });
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <Text  style={styles.text111}> SignUp Form </Text>
      <View>
        <Text style={styles.text11}>Name : </Text>
        <TextInput  selectedValue={name1} onChangeText={Name121 => setName1(Name121)}style={styles.textInput11}
          placeholder="Enter your Name" />
          <Text style={styles.text11}>Age : </Text>
        <TextInput keyboardType={'numeric'} onChangeText={age121 => setAge1(age121)} style={styles.textInput11}
          placeholder="Enter your age" />
          <Text style={styles.text11}>Gender :{gender}</Text>
        <Picker
          selectedValue={gender}
          onValueChange={chosenGender => setGender(chosenGender)} mode={'dropdown'}
          style={{backgroundColor:'lightgrey',
          height: 50, width: 150 }}>
          <Picker.Item label="Gender" value="" enabled={false} />
          <Picker.Item label="Male" value="Male"  />
          <Picker.Item label="Female" value="Female"/>
          <Picker.Item label="Others" value="Others"/>
        </Picker>
          <Text style={styles.text11}>Phone Number : </Text>
        <TextInput keyboardType={'numeric'} style={styles.textInput11} onChangeText={
            (text) => setPhone1(text)
          }
          placeholder="Enter Phone Number" />
          <Text style={styles.text11}>Email : </Text>
        <TextInput style={styles.textInput11} onChangeText={email121 => setEmail1(email121)}
          placeholder="Enter your email" />
          <Text style={styles.text11}>Enter your password</Text>
        <TextInput style={styles.textInput11} onChangeText={pass121 => setPasswd1(pass121)}
          secureTextEntry={true}
          placeholder="Password"
        />
        <View style={styles.space1}/>
        <Button title="SignUp" onPress={() => {insertData();}}/>
        <View style={styles.space1}/>

        <Button title="Already Have a Account? LogIn" onPress={() => navigation.navigate('Login')}/>
      </View>
      <View style={styles.space1}/>
      <Text>This app is made by Himanshu Raj </Text>
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
    height: 34,
    width:280,
    borderColor:'black',
    borderWidth:2,
    margin:2,
    fontSize:13,
  },
  text11:{
    height: 18,
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
  space1:{
    marginBottom:10,
    padding:5,
  },
});

export default App;
