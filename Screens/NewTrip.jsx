import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
const options = [
    { label: "Borella Junc", value: "Borella Junc" },
    { label: "BMICH", value: "BMICH" },
    { label: "Torington", value: "Torington" },
  ];

  const time = [
    { label: "5.30 AM", value: "5.30 AM" },
    { label: "6.00 AM", value: "6.00 AM" },
    { label: "6.30 AM", value: "6.30 AM" },
    { label: "7.00 AM", value: "7.00 AM" },
    { label: "7.30 AM", value: "7.30 AM" },
    { label: "8.00 AM", value: "8.00 AM" },
    { label: "8.30 AM", value: "8.30 AM" },
  ];

  const route = [
    { label: "Borella Junc", value: "Borella Junc" },
    { label: "BMICH", value: "BMICH" },
    { label: "Torington", value: "Torington" },
  ];

const SelectList = (props) => {
  const [selectedValue, setSelectedValue] = useState(null);

  
  return (
    <View>
      <Text>{props.PickerTitle}</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedValue(value)}
        items={props.itemArray}
        placeholder={{
          label: props.label,
          value: null,
        }}
        value={selectedValue}
        style={pickerSelectStyles} // Apply the custom styles
      />
    </View>
  );
};

const SelectRoute = (props) => {
    const [selectedValue, setSelectedValue] = useState(null);
  
    
    return (
      <View>
        <Text style={{textAlign:'center',fontWeight:'600',opacity:0.4}}>Start Location</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedValue(value)}
          items={props.itemArray}
          placeholder={{
            label: props.label,
            value: null,
          }}
          value={selectedValue}
          style={pickerSelectStyles2} // Apply the custom styles
        />
      </View>
    );
  };

const NewTrip = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, width: "100%" }}>
        <View style={styles.formContainer}>
          <Text>New Trip</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop:20
            }}
          >
            
            <View style={{ width: 200, flex: 1 }}>
              <SelectList itemArray={time} label={"Select Time"} PickerTitle={"Time"} />
            </View>
          </View>

            <View style={{flex:1,alignItems:'center',paddingTop:50}}>
            <SelectRoute itemArray={route} label={"Set Location"} PickerTitle={"Time"} />
                <Text>to</Text>
                <Text style={styles.LargeText}>IFS</Text>
            </View>
         
        </View>
      </SafeAreaView>
    </View>
  );
};

export default NewTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  formContainer: {
    flex: 1,
    textAlign: "left",
    width: "100%",
  },
  LargeText:{
    fontSize:40,
    fontWeight:'700'
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 20, // Adjust the font size as needed
    paddingVertical: 5,
    color: "black",
    fontWeight: "500",
  },
  inputAndroid: {
    fontSize: 20, // Adjust the font size as needed
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    color: "black",
  },
});

const pickerSelectStyles2 = StyleSheet.create({
    inputIOS: {
      paddingVertical: 5,
      color: "black",
      fontSize:40,
      fontWeight:'700',    },
    inputAndroid: {
        fontSize:40,
        fontWeight:'700',
              paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 8,
      color: "black",
    },
  });
