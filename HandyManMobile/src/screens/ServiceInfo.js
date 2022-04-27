import { Center, ScrollView, Box, Flex } from "native-base";
import React from "react";
import { Text, Headline, Subheading, Divider, Title, Button } from "react-native-paper";

import ImageSwiper from "../components/ImageSwiper";

import { Dimensions } from 'react-native'
const windowHeight = Dimensions.get("window").height;

const ServiceInfo = () => {
  return (
    <Center flex={1}>
      <ScrollView 
      // style={{ backgroundColor: "#003b801a" }}
      >
        <ImageSwiper />
        <Headline style={{ paddingLeft: 8, marginTop: 16 }}>
          This is my service
        </Headline>
        <Subheading style={{ paddingLeft: 8, marginTop: 8 }}>
          This is my address
        </Subheading>
        <Divider style={{ marginTop: 16 }} />
        <Title style={{ paddingLeft: 8, marginTop: 16 }}>Description:</Title>
        <Text style={{ paddingLeft: 8, marginTop: 16 }}>
          This is my description
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
          <Title>Price: $69</Title>
          <Button mode="contained">Book!</Button>
      </Box>
    </Center>
  );
};

export default ServiceInfo;
