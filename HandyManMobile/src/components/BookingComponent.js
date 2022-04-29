import { Box } from "native-base";
import {
  TextInput,
  Button,
  Headline,
  Title,
  Text,
  Subheading,
} from "react-native-paper";
import { DatePickerInput, DatePickerModal } from "react-native-paper-dates";
import React from "react";

const BookingComponent = ({ service }) => {
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
    var d = new Date(),
      year = d.getYear(),
      daysToDisable = [];

    d.setDate(1);

    while (!disableDates.includes(d.getDay())) {
      d.setDate(d.getDate() + 1);
    }

    console.log(d.getYear());
    while (d.getYear() === year) {
      if (disableDates.includes(d.getDay())) {
        var pushDate = new Date(d.getTime());
        daysToDisable.push(pushDate);
      }
      d.setDate(d.getDate() + 1);
    }
    return daysToDisable;
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
      <Button mode="contained" style={{ marginTop: 16 }}>
        Book!
      </Button>
    </>
  );
};

export default BookingComponent;
