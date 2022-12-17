/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const MyComponent = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Welcome to HomeScreen</Text>
            <View style={styles.space1}/>

            <Button title="LogOut" onPress={() => navigation.popToTop()}/>
            <View style={styles.space1}/>
            <Text>This app is made by Himanshu Raj</Text>
        </View>
    );
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    space1:{
        marginBottom:10,
        padding:5,
      },
});

export default MyComponent;
