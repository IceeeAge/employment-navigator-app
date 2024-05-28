import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function CompanyPostItem({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.push("DetailsScreen", {
          details: item,
        })
      }
    >
      <View style={styles.logoContainer}>
        <Image source={{ uri: item?.logo?.url }} style={styles.logoCompany} />
      </View>
      <View style={styles.InfoContainer}>
        <Text style={styles.companyName}>{item?.companyName}</Text>
        <Text style={styles.companyTitle}>{item?.title}</Text>
        <Text style={styles.companyAdress}>
          {item?.address.substring(0, 25)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 8,
    marginTop: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  logoContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: 90,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  InfoContainer: {
    marginTop: 10,
  },
  logoCompany: {
    width: 70,
    height: 70,
  },
  companyName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  companyTitle: {
    fontSize: 15,
    color: "gray",
  },
  companyAdress: {
    fontSize: 15,
    marginTop: 20,
    color: "gray",
  },
});
