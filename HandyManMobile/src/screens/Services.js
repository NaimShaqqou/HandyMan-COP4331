// import { View, Text } from 'react-native'
// import React from 'react'


import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, View, Text, FlatList, ScrollView} from 'react-native';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const Services = () => {
  const user = useSelector((state) => state.user)
  const services = useSelector((state) => state.services).services;
  
  return (
    <View>
      <Button>ADD</Button>
      <ScrollView>
        {
          Object.values(services).map(item => (
            <Text>
              <Card>
                <Card.Title 
                  style={{alignContent:'center'}} 
                  titleStyle={{color:'rgba(0,0,255,0.9)'}}
                  title = {item.Title} 
                  subtitle = {item.Description}
                />
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Content>
                  <Title></Title>
                  <Paragraph>
                    <Text> 
                      Price: {item.Price}{"\n"}
                      Category: {item.Category}{"\n"}
                      Days Available: {item.DaysAvailable}{"\n"}
                      Address: {item.Address}
                    </Text>
                  </Paragraph>
                </Card.Content>
                <Card.Actions>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </Card.Actions>
              </Card>
            </Text>
          ))
        }
      </ScrollView>

    </View>

  )
};
  
export default Services;