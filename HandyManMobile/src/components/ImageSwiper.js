import { StyleSheet, Dimensions } from "react-native";
import React from "react";

import Swiper from "react-native-swiper";

import { Box, Center, Divider, Image } from "native-base";
import { Text, Button, IconButton, useTheme } from "react-native-paper";

const windowHeight = Dimensions.get("window").height;

const renderPagination = (index, total, context) => {
  return (
    <>
      <Box
        alignSelf={"flex-end"}
        py={"8px"}
        px={"16px"}
        // backgroundColor={"#003b801a"}
        backgroundColor={"#00000099"}
        position={"absolute"}
        right={"16px"}
        top={windowHeight / 3.5}
        borderRadius={15}
      >
        <Text style={{ color: "white" }}>
          {index + 1} / {total}
        </Text>
      </Box>
    </>
  );
};

const ImageSwiper = ({ images, serviceSetter, service, edit }) => {
  const [curIndex, setCurIndex] = React.useState(0);
  const handleDelete = () => {
    let newImages = [...images];
    newImages.splice(curIndex, 1);

    console.log(newImages);
    serviceSetter({ ...service, Images: newImages });
  };

  const DeleteButton = () => {
    if (edit) {
      return (
        <Button
          style={{
            marginTop: -38,
            alignSelf: "flex-start",
            marginLeft: 8,
          }}
          mode="contained"
          icon="delete"
          color="#B00020"
          onPress={() => handleDelete()}
        >
          Delete Image
        </Button>
      );
    }
  };

  const ImageMap = ({ item }) => (
    <>
      <Center key={item}>
        <Image
          source={{
            uri: item,
          }}
          alt={"\n\n\n\n\n" + "Image Unavailable"}
          width="100%"
          height="100%"
        />
      </Center>
      <DeleteButton />
    </>
  );

  return (
    <>
      {service.Images.length !== 0 ? (
        <Swiper
          style={styles.wrapper}
          showsButtons={true}
          height={windowHeight / 3}
          renderPagination={renderPagination}
          loop={false}
          bounces={true}
          onIndexChanged={(index) => setCurIndex(index)}
        >
          {service.Images.map((item) => (
            <ImageMap key={item} item={item} />
          ))}
        </Swiper>
      ) : (
        <>
          <Center h={windowHeight / 3}>
            <Text>Personalize your service by adding an image!</Text>
          </Center>
          <Divider />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
});

export default ImageSwiper;
