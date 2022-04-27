import { Center, ScrollView, Box, Flex } from "native-base";
import React from "react";
import { Text, Headline, Subheading, Divider, Title, Button } from "react-native-paper";

import ImageSwiper from "../components/ImageSwiper";

import { Dimensions, StyleSheet } from 'react-native'
const windowHeight = Dimensions.get("window").height;

export default class ServiceInfo extends React.Component {

    constructor(props){

        super(props);
        this.state = {
          activeIndex:0,
          serviceOwner: {
            Email: "estebancbrugal@gmail.com",
            FirstName: "Brother in Christ",
            LastName: "Brugal",
            Password: "098f6bcd4621d373cade4e832627b4f6",
            ProfileDescription: "oooooggaa boooga",
            ProfilePicture: "https://res.cloudinary.com/dt7uj6vfp/image/upload/v1650252610/images/vet9jragj2otqqelhyab.jpg",
            Username: "test",
            Verified: true,
            __v: 0,
            _id: "6234c4d39a050a36555a6942",
          },
          service: {
            Address: "Waterford Lakes Parkway, Orlando, FL, USA",
            Category: "Teaching",
            DaysAvailable: [
              "Tuesday",
              "Saturday",
            ],
            Description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur ipsum, iusto hic laborum praesentium et distinctio alias sequi vitae commodi ratione esse placeat, atque officia libero! Nulla voluptates architecto ipsa!",
            Images: [
              "https://res.cloudinary.com/dt7uj6vfp/image/upload/v1650934686/images/jyvtq0tevgavi0cxbx54.jpg",
              "https://res.cloudinary.com/dt7uj6vfp/image/upload/v1650934687/images/lrorusgkoeelkvxbkrub.jpg",
              "https://res.cloudinary.com/dt7uj6vfp/image/upload/v1650934688/images/psthtbdzgvqqkg90fwk0.jpg",
              "https://res.cloudinary.com/dt7uj6vfp/image/upload/v1650934689/images/ow8caceygwyq8th7v9oz.jpg",
            ],
            Latitude: "28.557277",
            Longitude: "-81.2010939",
            Price: "4",
            Title: "TEST",
            UserId: "6234c4d39a050a36555a6942",
            __v: 0,
            _id: "626743a2a2bf479116950e4a",
          },
      }
    }

    componentDidMount() {
      this.GetServiceOwner();
    }

    GetServiceOwner() {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: this.state.service.UserId })
      };
      fetch('https://myhandyman1.herokuapp.com/api/get-user', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ serviceOwner: data.user }));
    }
    
    _renderItem({item,index}){
        return (
            <Image style={{width: Dimensions.get("screen").width, height: 330, resizeMode: 'contain'}} source={{uri: item}}/>
        )
    }

    render() {
      return (
        <Center flex={1}>
          <ScrollView 
          // style={{ backgroundColor: "#003b801a" }}
          >
            <ImageSwiper />
            <Headline style={{ paddingLeft: 8, marginTop: 16 }}>
              { this.state.service.Title }
            </Headline>
            <Subheading style={{ paddingLeft: 8, marginTop: 8 }}>
              { this.state.service.Address }
            </Subheading>
            <Divider style={{ marginTop: 16 }} />
            <Title style={{ paddingLeft: 8, marginTop: 16 }}>Description:</Title>
            <Text style={{ paddingLeft: 8, marginTop: 16 }}>
              { this.state.service.Description }
            </Text>
            <Divider style={{ marginTop: 16 }} />
            <Title style={{ paddingLeft: 8, marginTop: 16 }}>Reviews:</Title>
            <Text style={{ paddingLeft: 8, marginTop: 16 }}>
              These are my reviews
            </Text>
          </ScrollView>
          <Box
            width={"100%"}
            height={windowHeight * 0.08}
            borderTopLeftRadius={15}
            borderTopRightRadius={15}
            shadow={6}
            position={"absolute"}
            bottom={0}
            backgroundColor={"#003b801a"}
            justifyContent={'space-around'}
            flexDir={'row'}
            alignItems={'center'}
          >
              <Title>Price: ${ this.state.service.Price }</Title>
              <Button mode="contained">Book!</Button>
          </Box>
        </Center>
      );
          // <SafeAreaView style={{flex: 1, backgroundColor:"#003b801a", paddingTop: 40, }}>
          //   <ScrollView>
          //     <View style={{flexDirection:'row', justifyContent: 'center'}}>
          //         <Carousel
          //           loop={true}
          //           layout={'stack'}
          //           ref={ref => this.carousel = ref}
          //           data={this.state.service.Images}
          //           sliderWidth={300}
          //           itemWidth={300}
          //           renderItem={this._renderItem}
          //           onSnapToItem = { index => this.setState({activeIndex:index}) } />
          //     </View>
          //     <Text style={[styles.textLarge, styles.alignC, styles.borderShort]}>{ this.state.service.Title }
          //       <Text style={[styles.textSmall, styles.alignC, {fontWeight: "100"}]}>{'\n'}{ this.state.service.Category }</Text>
          //     </Text>
          //     <Text style={[styles.textMedium, styles.border, styles.alignC]}>{ this.state.service.Address }</Text>
          //     <Text style={[styles.textSmall, styles.border, styles.alignL]}>{ this.state.service.Description }</Text>
          //     <View style={{flexDirection:'row', paddingTop: 15}}>
          //       <Text style={[styles.textSmall, styles.alignL,]}>Service provided by
          //         <Text style={[styles.textMedium, {fontWeight: "bold"}, styles.alignL]}>{"\n"}{ this.state.serviceOwner.FirstName }</Text>
          //       </Text> 
          //       <Image style={styles.profilePic} source={{uri: this.state.serviceOwner.ProfilePicture}}/>
          //     </View>
          //   </ScrollView>
          // </SafeAreaView>
    }
}

const styles = StyleSheet.create({
  textLarge: {
    fontSize: 42,
    fontFamily: "ComfortaaBold",
  },
  textMedium: {
    fontSize: 24,
    fontFamily: "ComfortaaBold",
  },
  textSmall: {
    fontSize: 17,
    fontFamily: "ComfortaaBold",
  },
  alignL: {
    paddingLeft: 10,
    fontFamily: "ComfortaaBold",
  },
  alignR: {
    paddingRight: 10,
    textAlign: 'right',
  },
  alignC: {
    textAlign: 'center',
  },
  border:
  {
    paddingVertical: 15,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  borderShort:
  {
    paddingVertical: 5,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  profilePic:
  { 
    justifyContent: 'flex-end',
    paddingLeft: 250,
    width: 70, 
    height: 70, 
    resizeMode: 'contain', 
    borderRadius: 100
  },
});
