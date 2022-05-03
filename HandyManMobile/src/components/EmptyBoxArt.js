import { Subheading, Text } from "react-native-paper";
import React from "react";
import { Center, Image, View } from "native-base";

const EmptyBoxArt = ({ text }) => {
  return (
    <Center >
      <Subheading style={{ margin: 10 }} >{text}</Subheading>

      <Image
        source={require("../../assets/empty.png")}
        alt="People looking into empty box"
        resizeMode="contain"
        size="2xl"
      />
    </Center>
  );
};

export default EmptyBoxArt;
