import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet  } from 'react-native';

function PostDetail( {route} ){

    const [postDetail, setPostDetail] = useState();
    const [comments, setComments] = useState(); 
    const postId = route.params.postId;

    // get post with specific postId
    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts?id=${postId}`);
            const resData = await res.json();
            setPostDetail(resData);
        }

        getData();
    },[postId])

    // get all comments
    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/comments`);
            const resData = await res.json();
            setComments(resData);
        }

        getData();
    },[postId])
    
    // filter comments of specific postId
    const filteredComments = comments?.filter((item) => {
        return item.postId == postId;
    })
    
    return(
        <View style={styles.container}>
            {/* Post Section */}
            <View style={styles.postSection}>
                <FlatList 
                    data={postDetail}
                    renderItem ={({item}) => (
                        <View>
                            <Text style={styles.post}>Title: <Text style={styles.normalText}>{item.title}</Text></Text>
                            <Text style={styles.post}>UserId: <Text style={styles.normalText}>{item.userId}</Text></Text>
                        </View>
                    )}
                />
            </View>

            {/* Comment Section */}
           <View style={styles.commentSection}>
            <Text style={styles.commentsHeader}>Comments</Text>
                <FlatList 
                    data={filteredComments}
                    renderItem ={({item}) => (
                        <View style = {styles.commentItem}>
                            <View style={styles.items}>
                                <Text style={styles.boldText}>Title: <Text style={styles.normalText}> {item.name}</Text></Text>
                            </View>
                            <View style={styles.items}>
                                <Text style={styles.boldText}>Body: <Text style={styles.normalText}>{item.body}</Text></Text>
                            </View>
                            <View style={styles.items}>
                                <Text style={styles.boldText}>Email: <Text style={styles.normalText}>{item.email}</Text></Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: "#d3d3d3"
    },
    post:{
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10
    },
    postSection : {
        marginTop: 20,
        padding: 20,
        backgroundColor: 'white',
        fontSize: 24,
        borderRadius: 10,
        marginLeft: 20,
        marginRight: 20
    },
    commentsHeader : {
        margin: 8,
        fontSize: 18,
        fontWeight : "bold"
    },
    commentSection : {
        margin: 24,
        backgroundColor: 'white',
        fontSize: 24,
        borderRadius: 10,
    },
    commentItem : {
        padding: 12,
        borderColor: "#d3d3d3",
        borderWidth: 3,
        borderRadius: 5,
        margin: 6
    },
    items: {
        marginTop: 10,
    },
    boldText : {
        fontWeight: 'bold'
    },
    normalText: {
        fontWeight: "200"
    }
})

export default PostDetail;