import { StyleSheet, Dimensions } from "react-native";
import React from "react";

import Swiper from "react-native-swiper";

import { Box, Center, Image } from "native-base";
import { Text, Button } from "react-native-paper";

const windowHeight = Dimensions.get("window").height;

const renderPagination = (index, total, _context) => {
  return (
    <Box
      alignSelf={"flex-end"}
      py={"8px"}
      px={"16px"}
      backgroundColor={"#003b801a"}
      position={"absolute"}
      right={"16px"}
      top={windowHeight / 5}
      borderRadius={15}
    >
      <Text>
        <Text>{index + 1}</Text>/{total}
      </Text>
    </Box>
  );
};

const ImageSwiper = ({ images }) => {
  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={true}
      height={windowHeight / 4}
      renderPagination={renderPagination}
      loop={false}
      bounces={true}
    >
      {Object.values(images).map(item => (

      <Center>
        <Image
          source={{
            uri: item,
          }}
          alt={"\n\n\n\n\n" + "Image Unavailable"}
          width="100%"
          height="100%"
        />
      </Center>
      ))
      }
      
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
});

export default ImageSwiper;
