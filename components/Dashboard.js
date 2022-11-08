import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import db, { CollectionId_EmpDetails, DatabaseId } from "../config/db";
import account from "../config/index";

export default function Dashboard({navigation}){

    const [user, setUser] = useState('');
    const [employeeDetails, setEmployeeDetails] = useState({
        EmployeeId:'',
        EmployeeName:'',
        Designation:'',
        Salary: null,
        JoiningDate: ''
    });

    useEffect(() => {
        getUserName()
        return 
    });

    async function getUserName(){
        await account.get()
        .then(response=> setUser(response.name),
        error => console.log(error.message))
    };
    
    function handleSignOutSubmit(){
        account
        .deleteSession('current')
        .then(() => {
            AsyncStorage.setItem('isLoggedIn', 'no')
            navigation.replace("SignIn")
        },
        error => console.log(error))
    }

    async function handleSubmit(){
        console.log(employeeDetails);
        await db.createDocument(DatabaseId ,CollectionId_EmpDetails,employeeDetails.EmployeeId, employeeDetails)
        .then(response => console.log(response),
        error => console.log(error));
    }

    return (
        <View style={styles.container}>
            <Text>Welcome {user}</Text>
            <Button title="Sign Out" onPress={() => handleSignOutSubmit()} />
            <View style={{margin:10}}>
                <Text style={{fontWeight:'bold'}}>EMPLOYEE DETAILS</Text>
                <TextInput
                    placeholder='Employee Id'
                    style={styles.input}
                    value={employeeDetails.EmployeeId}
                    onChangeText={value => setEmployeeDetails({...employeeDetails, EmployeeId:value})}
                />
                <TextInput 
                    placeholder="Employee Name"
                    style={styles.input}
                    value={employeeDetails.EmployeeName}
                    onChangeText={value => setEmployeeDetails({...employeeDetails, EmployeeName:value})}
                />
                <TextInput 
                    placeholder="Designation"
                    style={styles.input}
                    value={employeeDetails.Designation}
                    onChangeText={value => setEmployeeDetails({...employeeDetails, Designation:value})}
                />
                <TextInput 
                    placeholder="Salary"
                    style={styles.input}
                    value={employeeDetails.Salary}
                    onChangeText={value => setEmployeeDetails({...employeeDetails, Salary:value})}
                />
                <TextInput 
                    placeholder="Joining Date"
                    style={styles.input}
                    value={employeeDetails.JoiningDate}
                    onChangeText={value => setEmployeeDetails({...employeeDetails, JoiningDate:value})}
                />
                <Button title="Submit" onPress={handleSubmit}/>
                <View style={{margin:5}}></View>
                <Button title="Employee List" onPress={() => navigation.navigate('EmployeeList')} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    input:{
        width:300,
        borderWidth: 1,
        paddingVertical:5,
        paddingHorizontal:20,
        margin: 15
    }
})