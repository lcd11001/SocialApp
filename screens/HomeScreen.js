import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    LayoutAnimation
} from 'react-native'
import * as firebase from 'firebase'
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'

const fakePosts = [
    {
        id: '1',
        name: 'name 1',
        text:
            'You can spell check very long text areas without compromising any performance hits. Regardless of the size of the text, UltimateSpell only sends small portions of the text to the server as needed, while the user spell checks through the text.',
        timestamp: 1583193600,
        avatar: require('../assets/avatar.png'),
        image: require('../assets/hi.png')
    },
    {
        id: '2',
        name: 'name 2',
        text:
            'Basically the spell check dialog box makes on-demand calls to a callback page on the server without refreshing the whole page or dialog. It keeps processing small blocks of text using the AJAX (Asynchronous JavaScript and XML) techniques.        ',
        timestamp: 1583193600,
        avatar: require('../assets/avatar.png'),
        image: require('../assets/hi.png')
    },
    {
        id: '3',
        name: 'name 3',
        text:
            'Note that UltimateSpell displays the text in the dialog box sentence-by-sentence just like Microsoft Word. This helps the user understand the actual context in which the spelling error occurs.',
        timestamp: 1583193600,
        avatar: require('../assets/avatar.png'),
        image: require('../assets/hi.png')
    }
]

export default class HomeScreen extends React.Component {
    renderPost = post => {
        return (
            <View style={styles.feedItem}>
                <Image source={post.avatar} style={styles.avatar} />
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <View>
                            <Text style={styles.name}>{post.name}</Text>
                            <Text style={styles.timestamp}>
                                {moment(post.timestamp).fromNow()}
                            </Text>
                        </View>

                        <Ionicons name='ios-more' size={24} color='#73788B' />
                    </View>

                    <Text style={styles.postText}>{post.text}</Text>

                    <Image
                        source={post.image}
                        style={styles.postImage}
                        resizeMode='cover'
                    />

                    <View style={{ flexDirection: 'row' }}>
                        <Ionicons
                            name='ios-heart-empty'
                            size={24}
                            color='#73788B'
                            style={{ marginRight: 16 }}
                        />
                        <Ionicons
                            name='ios-chatboxes'
                            size={24}
                            color='#73788B'
                            style={{ marginRight: 16 }}
                        />
                    </View>
                </View>
            </View>
        )
    }

    render() {
        LayoutAnimation.easeInEaseOut()

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Feed</Text>
                </View>

                <FlatList
                    style={styles.feed}
                    data={fakePosts}
                    renderItem={({ item }) => this.renderPost(item)}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFECF4'
    },
    header: {
        paddingTop: 64,
        paddingBottom: 16,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EBECF4',
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '500'
    },
    feed: {
        marginHorizontal: 16
    },
    feedItem: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 8,
        flexDirection: 'row',
        marginVertical: 8
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        fontSize: 15,
        fontWeight: '500',
        color: '#454D65'
    },
    timestamp: {
        fontSize: 11,
        color: '#C4C6CE',
        marginTop: 4
    },
    postText: {
        marginTop: 16,
        fontSize: 14,
        color: '#838999'
    },
    postImage: {
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16
    }
})
