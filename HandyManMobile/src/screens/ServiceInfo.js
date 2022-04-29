import { Center, ScrollView, Box, Divider, View } from "native-base";
import React, { useCallback } from "react";
import {
  Text,
  Headline,
  Subheading,
  Title,
  Button,
  Avatar,
} from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';

import axios from "axios";

import ImageSwiper from "../components/ImageSwiper";
import { Dimensions, StyleSheet } from "react-native";

import Review from "../components/Review";
import { FlatList } from "react-native-gesture-handler";

const windowHeight = Dimensions.get("window").height;

const ServiceInfo = ({ route }) => {
  const { service } = route.params;
  const [user, setUser] = React.useState(null);
  const [avgReviews, setAvgReviews] = React.useState(0);
  const [reviews, setReviews] = React.useState([]);
  const [fetchedData, setFetchedData] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    axios
      .post("https://myhandyman1.herokuapp.com/api/get-user", {
        userId: service.UserId,
      })
      .then((response) => {
        if (mounted) {
          setUser(response.data.user);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => (mounted = false);
  }, []);

  React.useEffect(() => {
    let mounted = true;
    axios
      .post("https://myhandyman1.herokuapp.com/api/get-reviews", {
        serviceId: service._id,
      })
      .then(function (response) {
        if (mounted) {
          setReviews(response.data.reviews);
          setAvgReviews(response.data.reviews.reduce((sum, curr) => sum += curr.Rating, 0));
          setFetchedData(true);
        }
      })
      .catch(function (response) {
        console.log(response);
      });

    return () => (mounted = false);
  }, []);

  const renderItem = useCallback(({ item }) => <Review review={item} />);

  return (
    <Center flex={1}>
      <Box
        width={"100%"}
        height={windowHeight * 0.08}
        borderTopLeftRadius={15}
        borderTopRightRadius={15}
        shadow={6}
        position={"absolute"}
        bottom={0}
        backgroundColor={"#003b801a"}
        justifyContent={"space-around"}
        flexDir={"row"}
        alignItems={"center"}
      >
        <Title>Price: ${service.Price}</Title>
        <Button mode="contained">Book!</Button>
      </Box>
      <ScrollView mb={"69px"}>
        <ImageSwiper images={service.Images} />
        <Box w={"90%"} alignSelf={"center"}>
          <Headline
            style={{
              fontFamily: "ComfortaaBold",
              paddingLeft: 8,
              marginTop: 16,
            }}
          >
            {service.Title}
          </Headline>
          <Subheading style={{ paddingLeft: 8, marginTop: 8 }}>
            {service.Address}
          </Subheading>
          <Divider style={{ marginTop: 16 }} />
          <Box
            mt={"16px"}
            alignItems={"center"}
            pl={"8px"}
            flexDir={"row"}
            justifyContent={"space-between"}
          >
            {user !== null && (
              <>
                <Title style={{ fontFamily: "ComfortaaBold" }}>
                  Service Provided By:{"\n"}
                  <Subheading>
                    {user.FirstName + " " + user.LastName}
                  </Subheading>
                </Title>

                <Avatar.Image size={80} source={{ uri: user.ProfilePicture }} />
              </>
            )}
          </Box>
          <Divider style={{ marginTop: 16 }} />

          <Title
            style={{
              fontFamily: "ComfortaaBold",
              paddingLeft: 8,
              marginTop: 16,
            }}
          >
            Description:
          </Title>
          <Text style={{ paddingLeft: 8, marginTop: 16 }}>
            {service.Description}
          </Text>
          <Divider style={{ marginTop: 16 }} />
          <Title
            style={{
              fontFamily: "ComfortaaBold",
              paddingLeft: 8,
              marginTop: 16,
            }}
          >
            Reviews:
          </Title>
          {fetchedData ? (
            <>
              {reviews.length === 0 ? (
                <Text style={{ paddingLeft: 8, marginTop: 16 }}>
                  No reviews yet...
                </Text>
              ) : (
                <View>
                  <View
                    style={{ 
                            fontFamily: "ComfortaaBold",
                            paddingLeft: 8,
                            marginTop: 16,
                            fontSize: 25,
                          }}
                    alignItems={'center'} 
                    flexDir={"row"}
                  >
                    <Icon name="star" size={24} color="#003c80" />
                    <Text style={{ fontSize: 18 }}> {Math.round(avgReviews / reviews.length * 10) / 10 }{'\t\t\t\t'}</Text>
                    <Icon name="user" size={24} color="#003c80" />
                    <Text style={{ fontSize: 18 }}> {reviews.length} review{reviews.length == 1 ? "" : "s"}</Text>
                  </View>
                    
                  <FlatList
                    data={reviews}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => (
                      <Divider style={{ marginTop: 16 }} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              )}
            </>
          ) : (
            <></>
          )}
        </Box>
      </ScrollView>
    </Center>
  );
};

// return (
//     <SafeAreaView style={{flex: 1, backgroundColor:"#003b801a", paddingTop: 40, }}>
//       <ScrollView>
//         <View style={{flexDirection:'row', justifyContent: 'center'}}>
//             <Carousel
//               loop={true}
//               layout={'stack'}
//               ref={ref => this.carousel = ref}
//               data={this.state.service.Images}
//               sliderWidth={300}
//               itemWidth={300}
//               renderItem={this._renderItem}
//               onSnapToItem = { index => this.setState({activeIndex:index}) } />
//         </View>
//         <Text style={[styles.textLarge, styles.alignC, styles.borderShort]}>{ this.state.service.Title }
//           <Text style={[styles.textSmall, styles.alignC, {fontWeight: "100"}]}>{'\n'}{ this.state.service.Category }</Text>
//         </Text>
//         <Text style={[styles.textMedium, styles.border, styles.alignC]}>{ this.state.service.Address }</Text>
//         <Text style={[styles.textSmall, styles.border, styles.alignL]}>{ this.state.service.Description }</Text>
//         <View style={{flexDirection:'row', paddingTop: 15}}>
//           <Text style={[styles.textSmall, styles.alignL,]}>Service provided by
//             <Text style={[styles.textMedium, {fontWeight: "bold"}, styles.alignL]}>{"\n"}{ this.state.serviceOwner.FirstName }</Text>
//           </Text>
//           <Image style={styles.profilePic} source={{uri: this.state.serviceOwner.ProfilePicture}}/>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//     )

const styles = StyleSheet.create({
  divider: {
    borderWidth: 0.25,
  },
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
    textAlign: "right",
  },
  alignC: {
    textAlign: "center",
  },
  border: {
    paddingVertical: 15,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  borderShort: {
    paddingVertical: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  profilePic: {
    justifyContent: "flex-end",
    paddingLeft: 250,
    width: 70,
    height: 70,
    resizeMode: "contain",
    borderRadius: 100,
  },
});

export default ServiceInfo;
