import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Header from "./Header";
import CompanyListItem from "./CompanyListItem";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <CompanyListItem />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
});
