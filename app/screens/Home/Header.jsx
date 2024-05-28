import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

export default function Header() {
  const { user } = useUser();

  return (
    <View style={{ paddingTop: 33 }}>
      <View style={styles.Container}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logo}
        />
        <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.userText}>{user.fullName.substring(0, 25)}</Text>
        <Text style={styles.findText}>Find your perfect job</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userImage: {
    width: 55,
    height: 55,
    borderRadius: 99,
  },
  logo: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 99,
    objectFit: "contain",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userText: {
    fontSize: 15,
    color: "gray",
  },
  findText: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: "bold",
  },
});
