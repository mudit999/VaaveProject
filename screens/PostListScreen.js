import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';

function PostListScreen({navigation}){

    const [postData, setPostData] = useState();

    // get all posts
    useEffect(() => {
        const getData = async () => {
            const res = await fetch("https://jsonplaceholder.typicode.com/posts");
            const resData = await res.json();
            setPostData(resData);
        }

        getData();
    },[])

    // userId handler
    const userIdPressed = (userId) => {
        navigation.navigate("User Details", {userId : `${userId}`});
    }

    // postId handler
    const postIdPressed = (postId) => {
        navigation.navigate("Post Details", {postId : `${postId}`});
    }

    return(
        <View style= {styles.container}>
            <FlatList 
                data={postData}
                renderItem ={({item}) => (
                    <TouchableOpacity onPress={() => postIdPressed(item.id)}>
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemTitle}>Title: <Text style={styles.normalText}>{item.title}</Text></Text>
                            <TouchableOpacity onPress={() => userIdPressed(item.userId)}>
                                <Text style={styles.itemId}>UserId: <Text style={styles.normalText}>{item.userId}</Text></Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
)}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: "#d3d3d3"
    },
    itemContainer : {
        marginTop: 24,
        padding: 30,
        backgroundColor: 'white',
        fontSize: 24,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10
    },
    itemId : {
        fontWeight: "bold",
        borderColor: "#d3d3d3",
        borderWidth: 2,
        borderRadius: 5,
        fontSize: 18,
    },
    itemTitle : {
        marginTop: 10,
        fontWeight: "bold",
        fontSize: 20,

    },
    normalText : {
        fontWeight: "200",
        fontSize: 20,
    }
})

export default PostListScreen;