import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, SafeAreaView, FlatList } from 'react-native';
import NoteSheet from './NoteSheet';
import notes from "../services/notes";

class HomeScreen extends Component
{
  constructor(props) {
    super(props);
  }

  state = {
    DATA: notes,
  };

  onFocus = this.props.navigation.addListener("focus", (e) => {
    this.setState({DATA: notes});
  });

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
                //Trouver MIEUX que ça pour la lisibilité !!!!!!!
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
              <Text style={{color: "white"}}>{"Ajouter le bouton de création !"}</Text>
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
    backgroundImageStyle: {
      flex: 1,
    },
});

export default HomeScreen;