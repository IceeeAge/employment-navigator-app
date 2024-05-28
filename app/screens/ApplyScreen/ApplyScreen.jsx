import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator, // Added for loading indicator
} from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import GlobalApi from "../../Graphql/GlobalApi";
import { Feather, Entypo } from "@expo/vector-icons";
import DeleteModal from "./DeleteModal";
import { useNavigation } from "@react-navigation/native";

export default function ApplyScreen() {
  const navigate = useNavigation();
  const { user } = useUser();
  const [appliedUserList, setAppliedUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  useEffect(() => {
    user && getUserApplied();
  }, [user]);

  const getUserApplied = async () => {
    setLoading(true);
    try {
      const resp = await GlobalApi.getUserApplied(
        user?.primaryEmailAddress.emailAddress
      );
      setAppliedUserList(resp?.appliedLists || []);
    } catch (error) {
      console.error("Error fetching applied list:", error);
      ToastAndroid.show("Failed to fetch applied list", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    getUserApplied();
  };

  const deleteApplied = async () => {
    try {
      await GlobalApi.deleteAppliedList(deleteItemId);
      setAppliedUserList((currentList) =>
        currentList.filter((item) => item.id !== deleteItemId)
      );
      setDeleteModalVisible(false);
      ToastAndroid.show("Application deleted successfully", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Error deleting applied list:", error);
      ToastAndroid.show("Failed to delete application", ToastAndroid.SHORT);
    }
  };

  const openDeleteModal = (id) => {
    setDeleteItemId(id);
    setDeleteModalVisible(true);
  };

  const openDetails = (item) => {
    navigate.navigate("DetailsScreen", {
      details: item?.company,
    });
    onRefresh();
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.headerText}>Applied</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#ccc" />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={appliedUserList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openDetails(item)}>
              <View style={styles.infoContainer}>
                <View style={styles.flexDirectionContainer}>
                  <Text>{item?.company.title.substring(0, 70)}</Text>
                  <TouchableOpacity onPress={() => openDeleteModal(item.id)}>
                    <Entypo
                      name="dots-three-vertical"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                <Text>{item?.company.companyName.substring(0, 30)}</Text>
                <Text>{item?.company.address.substring(0, 30)}</Text>
                <Text>{item?.date}</Text>
                <View style={styles.StatusContainer}>
                  <Feather name="check-circle" size={24} color="green" />
                  <Text>Applied</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          refreshing={loading}
          onRefresh={onRefresh}
        />
      )}

      <DeleteModal
        visible={deleteModalVisible}
        onDelete={deleteApplied}
        onCancel={() => setDeleteModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
  },
  subContainer: {
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  infoContainer: {
    borderWidth: 1,
    padding: 20,
    backgroundColor: "white",
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
  },
  flexDirectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  StatusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 30,
  },
});
