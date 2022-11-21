import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import db, { CollectionId_EmpDetails, DatabaseId } from '../config/db';

export default function EmployeeList(){
  const [employeeCount, setEmployeeCount] = useState(0);
  const [employee, setEmployee] =useState([]);

  async function getEmployeeList(){
    await db.listDocuments(DatabaseId, CollectionId_EmpDetails)
    .then(response => {
      console.log(response);
      setEmployeeCount(response.total);
      response.documents.map(detail => setEmployee(current => [...current, detail]));
      console.log(employee);
    },
    error => console.log(error));
  }

  useEffect(() =>{
    getEmployeeList()
  },[]);

    return (
        <View style={styles.container}>
            <Text style={{fontWeight:'bold', fontSize:24}}>Employee List</Text>
            <Text>No of Employees : {employeeCount}</Text>
            <FlatList 
            data={employee}
            renderItem={
              ({item}) => (
                <View style={styles.details}>
                <Text>Employee ID : {item.EmployeeId}</Text>
                <Text>Employee Name : {item.EmployeeName}</Text>
                <Text>Designation : {item.Designation}</Text>
                <Text>Salary : {item.Salary}</Text>
                <Text>Joining Date : {item.JoiningDate}</Text>
                </View>
            )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  details:{
    borderwidth: 5,
    borderColor: 'black',
    borderStyle:'dashed',
    borderRadius:15,
    backgroundColor:'white',
    margin: 5,
    padding:10
  }
})
