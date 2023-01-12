import React, {useState, useEffect} from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

function SearchUser(){

    const [allUser, setAllUser] = useState();
    const [username, setUsername] = useState();
    const [filteredUser, setFilteredUser] = useState([]);

    // get all users
    useEffect(() => {
            const getData = async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
            const resData = await res.json();
            setAllUser(resData);
        }

        getData();
    },[])

    // filter user using username
    const getUser = () => {
        const userDetail = allUser.filter((item) => {
        return item.username == `${username}`;
    })

    setFilteredUser(userDetail);
    }

    return (
        <View style = {styles.container}>

            {/* User Input Area */}
            <View style = {styles.searchArea}>
                <View style={styles.searchAreaItems}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Search by username"
                        onChangeText={data => setUsername(data)}
                        defaultValue={username}
                    />
                </View>

                <View style={styles.searchAreaItems}>
                    <Button color={'black'} title='Search' onPress={() => getUser()}></Button>
                </View>
            </View>
            
            {/* Display results */}
            <View>
                {filteredUser?.map((item) => {
                    return(
                    <View key={item?.username}>
                        <Text style = {styles.boldText}>Name : <Text style = {styles.normalText}>{item?.name}</Text></Text>
                        <Text style = {styles.boldText}>Username : <Text style = {styles.normalText}>{item?.username}</Text></Text>
                        <Text style = {styles.boldText}>Email : <Text style = {styles.normalText}>{item?.email}</Text></Text>
                        <Text style = {styles.boldText}>Website : <Text style = {styles.normalText}>{item?.website}</Text></Text>
                        <Text style = {styles.boldText}>Company Name : <Text style = {styles.normalText}>{item?.company?.name}</Text></Text>
                        <Text style = {styles.boldText}>Catch Phrase : <Text style = {styles.normalText}>{item?.company?.catchPhrase}</Text></Text>
                    </View>)
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        margin: 24,
        flex: 1,
        backgroundColor: "white",
        padding: 20,
        fontSize: 24,
        borderRadius: 10,
    },
    searchArea : {
        flexDirection: 'row',
        borderColor: "#d3d3d3",
        borderWidth: 2,
        borderRadius: 5,
        marginBottom: 10
    },
    searchAreaItems : {
        flex:1,
    },
    textInput : {
        height: 40,
        padding: 10,
        fontSize: 15
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

export default SearchUser;