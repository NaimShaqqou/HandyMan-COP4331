import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import { ImageBackground, Dimensions, StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { Center, Column, ListItem } from 'native-base';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const { width, height } = Dimensions.get("screen");

//<View style = {styles.viewContainer}>
const Services = () => {
  const user = useSelector((state) => state.user)
  const services = useSelector((state) => state.services).services;
  
  return (
    <ImageBackground
      source={require("../../assets/profile-screen-bg.png")}
      style={{
        width: width,
        height: height,
        padding: 0,
        zIndex: 1,
      }}
      imageStyle={{ width: width, height: height }}
      >
      <Text>{"\n"}</Text>
      
      <Button style = {styles.addButton}>
        <Icon name="add-circle-outline" size = {40} color={"white"} style ={{marginRight: 0}}/>
      </Button>


      <ScrollView contentContainerStyle = {styles.viewContainer}>
        { 
          Object.values(services).map(item => (
            <Text key={item._id}>
              <Card style = {styles.menuContainer}>
                <Card.Title 
                  titleStyle={{justifyContent:'center', alignItems:'center'}}
                  title = {item.Title} 
                  subtitle = {item.Description}
                />
                <Card.Cover style = {{ borderRadius: 10}} source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Content>
                  <Title></Title>
                  <View style = {styles.cardContentView}>
                    <Icon name="credit-card"  style ={{marginRight: 0, }}/>
                    <Text>  Price: ${item.Price}</Text>
                  </View>
                  <View style = {styles.cardContentView}>
                    <Icon name="home-repair-service" style ={{marginRight: 0, }}/>
                    <Text>  Category: {item.Category}</Text>
                  </View>
                  <View style = {styles.cardContentView}>
                    <Icon name="event" style ={{marginRight: 0, }}/>
                    <Text>  Days Available: {item.DaysAvailable}</Text>
                  </View>
                  <View style = {styles.cardContentView}>
                    <Icon name="place" style ={{marginRight: 0, }}/>
                    <Text>  Address: {item.Address}</Text>
                  </View>
                </Card.Content>
                <Card.Actions>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </Card.Actions>
              </Card>{"\n"}
            </Text>
          ))
        }
        <Text>{"\n"}{"\n"}{"\n"}</Text>
      </ScrollView>
    </ImageBackground>

  )
};

const styles = StyleSheet.create({
  menuContainer:{
    display: 'flex',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 20,
    borderColor: 'blue',
    borderWidth: 3,
    elevation: 5,
    shadowColor: '#470000',
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    justifyContent:'center',
    alignItems: 'stretch',
    width: width,
    maxWidth: '100%',
  },

  viewContainer:{
    flexDirection: 'column',
    justifyContent:'space-between',
    alignItems: 'center',
    margin: 10,
    width: width,
    maxWidth: '95%',
  },

  addButton:{
    alignItems: 'center',
  },

  cardContentView:{
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
    width: width,
    maxWidth: '95%',
  }
})
  
export default Services;