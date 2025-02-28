import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import vacationDestinations from "../constant/list_item";

const Lab4 = () => {
  const [clickedLocations, setClickedLocations] = useState<string[]>([]);

  

  const handleToggle = (location : string) => {
    const selectedLocation = String(vacationDestinations.find((item) => item.location === location));

    if (clickedLocations.includes(selectedLocation)) {
      setClickedLocations(clickedLocations.filter((item) => item !== selectedLocation));
    } else {
      setClickedLocations([...clickedLocations, selectedLocation]);
    }
  };
  
  return (
    <View style={styles.container}>
      <FlatList
        data={vacationDestinations}
        keyExtractor={(item) => item.location}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity 
              onPress={() => handleToggle(item.location)}
              style={[
                styles.button,
                { backgroundColor: clickedLocations.includes(item.location) ? "green" : "#007BFF" }
              ]}
            >
              <Text style={styles.buttonText}>{item.location}</Text>
            </TouchableOpacity>

            <View style={styles.details}>
              <Text>Price: {item.price}</Text>
              <Text>Temp: {item.average_yearly_temperature}</Text>
              <Text>{clickedLocations.includes(item.location) ? "✅" : ""}</Text> 
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  item: {
    marginBottom: 15,
    alignItems: "center",
  },
  button: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  details: {
    marginTop: 5,
    alignItems: "center",
  }
});

export default Lab4;
