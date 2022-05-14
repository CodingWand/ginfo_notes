import React, {Component} from "react";
import {View,
    Text,
    StyleSheet,
    Pressable,
} from "react-native";

class NoteSheet extends Component
{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Pressable
            style={styles.sheet}
            onPress={() => {
                this.props.navigator.navigate('Editing', {
                    title: this.props.title,
                    content: this.props.content,
                    noteID: this.props.noteID,
                });
            }}
            >

                <View style={styles.header}>
                    <Text style={styles.noteTitle}>{this.props.title}</Text>
                </View>

                <View style={styles.body}>
                    <Text>{this.props.content}</Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.noteFooter}>{this.props.creationDate}</Text>
                </View>

            </Pressable>
        );
    }
}

const styles = StyleSheet.create({
    sheet: {
        backgroundColor: "#ddddddd0",
        padding: 5,
        marginHorizontal: 10,
        marginVertical: 10,
        height: 120,
        borderRadius: 10,
        padding: 10,
    },
    header: {
        flex: 1,
        justifyContent: "center",
    },
    body: {
        flex: 2,
    },
    footer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    noteTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    noteFooter: {
        fontStyle: "italic",
    }
});

export default NoteSheet;