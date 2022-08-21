import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, FlatList, Pressable } from 'react-native';
import NoteSheet from './NoteSheet';
import notes from "../services/notes";


//Component life cycle
class HomeScreen extends Component
{
  constructor(props) {
    super(props);

    this.state = {
      DATA: notes,
    };
  }

  componentDidMount() {
    this.onFocus = this.props.navigation.addListener("focus", (e) => {
      this.setState({DATA: notes});
    });
  }

  componentWillUnmount() {
    //Delete onFocus
    removeEventListener('focus', this.onFocus);
  }

  getNavigator() {
    return this.props.navigation;
  }

  render() {
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
                data={this.state.DATA}
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
                  noteID: this.state.DATA.length,
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

export default HomeScreen;