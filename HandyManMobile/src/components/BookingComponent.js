import { useToast } from "native-base";
import ToastAlert from "./ToastAlert";
import {
  TextInput,
  Button,
  Headline,
  Text,
  Subheading,
} from "react-native-paper";
import {  DatePickerModal } from "react-native-paper-dates";
import { format } from 'date-fns';
import React from "react";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionCreators from "../reducerStore/ActionCreators/index";
import AsyncStorage from"@react-native-async-storage/async-storage";


const BookingComponent = ({ service, modalRef }) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const { updateCurrentUser, logoutUser, logoutServices } = bindActionCreators(ActionCreators, dispatch);

  const [disabledDates, setDisabledDates] = React.useState([]);
  
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  React.useEffect(() => {
    var blah = disableDates();
    setDisabledDates(blah);
  }, []);

  function convertAvailableDaysToNumbers() {
    let days = service.DaysAvailable;
    let array = [0, 1, 2, 3, 4, 5, 6];

    days.forEach((date) => {
      let index;
      if (date === "Monday") {
        index = array.indexOf(1);
        if (index >= 0) array.splice(index, 1);
      } else if (date === "Tuesday") {
        index = array.indexOf(2);
        if (index >= 0) array.splice(index, 1);
      } else if (date === "Wednesday") {
        index = array.indexOf(3);
        if (index >= 0) array.splice(index, 1);
      } else if (date === "Thursday") {
        index = array.indexOf(4);
        if (index >= 0) array.splice(index, 1);
      } else if (date === "Friday") {
        index = array.indexOf(5);
        if (index >= 0) array.splice(index, 1);
      } else if (date === "Saturday") {
        index = array.indexOf(6);
        if (index >= 0) array.splice(index, 1);
      } else if (date === "Sunday") {
        index = array.indexOf(0);
        if (index >= 0) array.splice(index, 1);
      }
    });

    return array;
  }

  function disableDates() {
    let disableDates = convertAvailableDaysToNumbers();
    if (disableDates.length === 0) return []

    var d = new Date(),
      year = d.getYear(),
      daysToDisable = [];

    d.setDate(1);

    while (!disableDates.includes(d.getDay())) {
      d.setDate(d.getDate() + 1);
    }
    
    while (d.getYear() === year) {
      if (disableDates.includes(d.getDay())) {
        var pushDate = new Date(d.getTime());
        daysToDisable.push(pushDate);
      }
      d.setDate(d.getDate() + 1);
    }
    return daysToDisable;
  }

  const calculatePrice = () => {
    let timeDifference = range.endDate.getTime() - range.startDate.getTime()

    // number of days between the two dates
    let daysDifference = timeDifference / (1000 * 3600 * 24)

    let numWorkingDays = 1
    let disabledDays = convertAvailableDaysToNumbers()
    let newDate = new Date(range.startDate)

    for (let i = 1; i < daysDifference; i++) {
      newDate.setDate(newDate.getDate() + 1)

      if (!disabledDays.includes(newDate.getDay())) {
        numWorkingDays++
      }
    }

    let price = parseInt(service.Price) * numWorkingDays
    return price
  }

  const toast = useToast();
  const [loading, setLoading] = React.useState(false)
  const doBook = async () => {
    setLoading(true)
    const serviceRequest = {
        requesterId: user.userId,
        serviceId: service._id,
        price: calculatePrice(),
        dates: [format(range.startDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"), format(range.endDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")],
        description: msg,
        jwtToken: user.jwtToken
    }

    console.log(serviceRequest)

    await axios
      .post("https://myhandyman1.herokuapp.com/api/request-service", serviceRequest)
      .then(async function (response) {
        if (response.data.jwtToken === "") {
          await AsyncStorage.setItem("userInfo", JSON.stringify({...user, jwtToken: ""}));
          logoutUser()
          logoutServices()
        } else {
          updateCurrentUser({...user, jwtToken: response.data.refreshedToken})
          await AsyncStorage.setItem("userInfo", JSON.stringify({...user, jwtToken: response.data.refreshedToken}));

          if (response.data.error == "") {
            const item = {
              title: "Service Booked",
              status: "success",
              description:
                "Service request was sent to the handler.",
            }
            toast.show({
              render: ({id}) => {
                return <ToastAlert toast={toast} id={id} {...item} />
              },
            });
            modalRef.current?.close()
          } else {
            const item = {
              title: "Error",
              status: "error",
              description: res.data.error,
            }

            toast.show({
              render: ({id}) => {
                return <ToastAlert toast={toast} id={id} {...item} />
              },
            });
          }

          setLoading(false)
        }
      })
      .catch(function (response) {
        console.log(response)
        setLoading(false)
      })
  }

  const [range, setRange] = React.useState({
    startDate: undefined,
    endDate: undefined,
  });

  const [open, setOpen] = React.useState(false);

  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = React.useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setRange({ startDate, endDate });
    },
    [setOpen, setRange]
  );

  React.useEffect(() => {
      if(range.startDate != undefined){
          var newStart = range.startDate.toLocaleDateString()
          var newEnd = range.endDate.toLocaleDateString()
        setStartDate(newStart);
        setEndDate(newEnd);

      }
  }, [range]);

  const [msg, setMsg] = React.useState("");

  return (
    <>
      <Headline style={{ fontFamily: "ComfortaaBold" }}>Book Service</Headline>

      <TextInput
        label={"Message to handler"}
        multiline={true}
        onChangeText={(newMsg) => setMsg(newMsg)}
        defaultValue={msg}
        left={<TextInput.Icon name="message-outline" />}
        style={{ marginTop: 16 }}
      />
      <Subheading style={{marginTop: 16}}>
        Start Date: <Text>{startDate}</Text>
      </Subheading>
      <Subheading>
        End Date: <Text>{endDate}</Text>
      </Subheading>

      <DatePickerModal
        locale="en"
        mode="range"
        visible={open}
        onDismiss={onDismiss}
        startDate={range.startDate}
        endDate={range.endDate}
        onConfirm={onConfirm}
        validRange={{
          startDate: new Date(), // optional
          disabledDates: disabledDates, // optional
        }}
      />

      <Button
        mode="outlined"
        style={{ marginTop: 16 }}
        onPress={() => setOpen(true)}
        // onPress={() => console.log(new Date(2022, 4, 1))}
      >
        Pick Dates
      </Button>
      <Button loading={loading} disabled={loading} mode="contained" style={{ marginTop: 16 }} onPress={() => doBook()}>
        Book!
      </Button>
    </>
  );
};

export default BookingComponent;
