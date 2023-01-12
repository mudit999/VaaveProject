import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchUser from '../component/SearchUser';

function UserDetail( {route} ){

    const [userDetail, setUserDetail] = useState();
    const userId = route.params.userId;

    // get user with specific userId
    useEffect(() => {
            const getData = async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
            const resData = await res.json();
            setUserDetail(resData);
        }

        getData();
    },[userId])

    return(
        <View style = {styles.container}>

            {/* User Detail section */}
            <View style = {styles.userSection}>
                <Text style = {styles.boldText}>Name : <Text style = {styles.normalText}>{userDetail?.name}</Text></Text>
                <Text style = {styles.boldText}>Username : <Text style = {styles.normalText}>{userDetail?.username}</Text></Text>
                <Text style = {styles.boldText}>Email : <Text style = {styles.normalText}>{userDetail?.email}</Text></Text>
                <Text style = {styles.boldText}>Website : <Text style = {styles.normalText}>{userDetail?.website}</Text></Text>
                <Text style = {styles.boldText}>Company Name : <Text style = {styles.normalText}>{userDetail?.company?.name}</Text></Text>
                <Text style = {styles.boldText}>Catch Phrase : <Text style = {styles.normalText}>{userDetail?.company?.catchPhrase}</Text></Text>
            </View>

            {/* Search User functionality */}
            <SearchUser />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: "#d3d3d3"
    },
    userSection : {
        marginTop: 20,
        padding: 20,
        backgroundColor: 'white',
        fontSize: 24,
        borderRadius: 10,
        marginLeft: 20,
        marginRight: 20
    },
    boldText : {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10
    },
    normalText: {
        fontWeight: "200"
    }
})

export default UserDetail;