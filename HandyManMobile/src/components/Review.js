import React from "react";
import { Center } from "native-base";
import { List, Avatar, Button, Text } from "react-native-paper";
import axios from "axios";

const Review = ({ review }) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    console.log("IN REVIEW USE EFFECT");
    let mounted = true;
    axios
      .post("https://myhandyman1.herokuapp.com/api/get-user", {
        userId: review.UserId,
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

  return (
    <>
      {user !== null && review !== null && (
        <List.Item
          style={{ paddingLeft: 8, marginTop: 16 }}
          left={() => (
            <Avatar.Image size={48} source={{ uri: user.ProfilePicture }} />
          )}
          right={() => (
            <Center flexDir={"row"} justifyContent={"center"}>
              <Button icon="star">{review.Rating}</Button>
            </Center>
          )}
          title={user.FirstName + " " + user.LastName}

        />
      )}
      <Text style={{marginTop: 16, paddingLeft: 8}}>{review.ReviewText}</Text>
    </>
  );
};

export default Review;
