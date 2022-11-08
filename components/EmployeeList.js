import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import db, { CollectionId_EmpDetails, DatabaseId } from '../config/db';

export default function EmployeeList(){

  async function getEmployeeList(){
    await db.listDocuments(DatabaseId, CollectionId_EmpDetails)
    .then(response => console.log(response),
    error => console.log(error));
  }

  useEffect(() =>{
    getEmployeeList()
  });

    return (
        <View style={styles.container}>
            <Text style={{fontWeight:'bold', fontSize:24}}>Employee List</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})
