import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, FlatList, Pressable } from 'react-native';
import NoteSheet from './NoteSheet';
import {connect} from 'react-redux';
import {loadNotes} from './../services/noteSlice';

const mapStateToProps = (state) => {
  return state
};

class HomeScreen extends Component
{
  constructor(props) {
    super(props);
  }

  async componentDidMount() {    
    //await this.props.dispatch(loadNotes());

    /*
    const myNotes = this.props.notes;
    this.onFocus = this.props.navigation.addListener("focus", async (e) => {
      
      const cache = new Cache({
        namespace: "myGInfoNotes",
        policy: {
            maxEntries: 50000, // if unspecified, it can have unlimited entries
            stdTTL: 0 // the standard ttl as number in seconds, default: 0 (unlimited)
        },
        backend: AsyncStorage
      });

      cache.set("notes", myNotes.data);

      //const entries = await cache.get("notes");
      //console.log(entries);
    });
    */
  }

  componentWillUnmount() {
  }

  getNavigator() {
    return this.props.navigation;
  }

  render() {
    let notes = this.props.notes;
    return (
      <View style={styles.container}>
        <ImageBackground
        style={styles.backgroundImageStyle}
        source={require("./../assets/logobest.png")}
        resizeMode={"contain"}
        >
          <SafeAreaView style={styles.innerContainer}>
  
            <View style={styles.header}>
              <Text style={styles.screenTitle}>GInfo Notes</Text>
            </View>
  
            <View style={styles.body}>

              <FlatList
                data={ notes.data }
                extraData={ notes.data }
                renderItem={({item, index}) => {
                  return (
                    <NoteSheet
                      title={item.title}
                      content={item.content}
                      creationDate={item.creationDate}
                      navigator={this.props.navigation}
                      noteID={index}
                    />
                  );
                }}
                navigation={this.props.navigation}
                keyExtractor={item => item.id}
              />
              
            </View>
  
            <View style={styles.footer}>
              <Pressable
              style={styles.creationButton}
              onPress={()=>{
                this.props.navigation.navigate("Editing", {
                  title: "",
                  content: "",
                  noteID: notes.length,
                });
              }}
              >
                <Text style={styles.creationButtonText}>Nouveau</Text>
              </Pressable>
            </View>
  
          </SafeAreaView>
  
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    );
  }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#222222',
    },
    innerContainer: {
      flex: 1,
      paddingTop: 50,
      padding: 20,
    },
    screenTitle: {
        color: "#fff",
        fontFamily: "Roboto",
        fontSize: 40,
        fontWeight: "bold",
    },
    header: {
      flex: 1,
      paddingTop: 10,
      flexDirection: "row",
      justifyContent: "center",
    },
    body: {
      flex: 8,
    },
    footer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
    },
    creationButton : {
      backgroundColor: "#009532",
      borderRadius: 10,
      justifyContent: "center",
      paddingHorizontal: 10,
      marginVertical: 15,
    },
    creationButtonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 20,
    },
    backgroundImageStyle: {
      flex: 1,
    },
});

export default connect(mapStateToProps)(HomeScreen);