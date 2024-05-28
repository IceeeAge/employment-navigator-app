import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; // import icon library
import CompanyPostItem from "./CompanyPostItem";
import GlobalApi from "../../Graphql/GlobalApi";
import { KeyboardAvoidingView } from "react-native";

export default function CompanyListItem() {
  // State variables
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch companies on component mount
  useEffect(() => {
    getCompanies();
  }, []);

  // Function to fetch companies from the API
  const getCompanies = async () => {
    const response = await GlobalApi.getCompany();
    const companyData = response?.companies || [];
    setCompanies(companyData);
    setFilteredCompanies(companyData);
  };

  // Function to handle search query changes
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = companies.filter(
      (company) =>
        company.companyName.toLowerCase().includes(query.toLowerCase()) ||
        company.title.toLowerCase().includes(query.toLowerCase()) ||
        company.address.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCompanies(filtered);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={24}
          color="#aaa"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      {/* Title */}
      <Text style={styles.title}>Recommended for you</Text>
      {/* Scrollable list of filtered companies */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredCompanies.map((item, index) => (
          <CompanyPostItem key={index} item={item} />
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
    flex: 1,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 30,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
  },
});
