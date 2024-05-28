import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import Markdown from "react-native-markdown-display";
import { Ionicons } from "@expo/vector-icons";
import AppliedModal from "./AppliedModal";
import { useUser } from "@clerk/clerk-expo";
import GlobalApi from "../../Graphql/GlobalApi";

export default function DetailsScreen() {
  const {user}=useUser();
  const route = useRoute();
  const [details, setDetails] = useState(route?.params?.details);
  const [showModal, setShowModal] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    if (route?.params?.details) {
      setDetails(route.params.details);
    }
  }, [route?.params]);

  useEffect(() => {
    if (user) {
      GlobalApi.getUserApplied(user?.primaryEmailAddress.emailAddress).then(
        (resp) => {
          setAppliedJobs(resp?.appliedLists || []);
        }
      );
    }
  }, [user]);

  const isApplied = appliedJobs.some(
    (applied) => applied?.company?.id === details?.id
  );

  const openLocationInMaps = (address) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
    Linking.openURL(mapsUrl); // Opening Google Maps with the provided address
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: details?.image?.url }}
          style={styles.horizontalLogo}
        />

        <View style={styles.infoContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: details?.logo?.url }}
              style={styles.logoCompany}
            />
          </View>

          <View>
            <Text style={styles.companyName}>{details?.companyName}</Text>
            <Text>{details?.title}</Text>

            <View style={styles.underline} />
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Job Details</Text>
            
            {/* Job Type */}
            <View style={styles.row}>
              <Ionicons name="bag" size={24} color="black" />
              <Text>Job type: {details?.jobType}</Text>
            </View>

            {/* Shift and Schedule */}
            <View style={styles.row}>
              <Ionicons name="time" size={24} color="black" />
              <Text>Shift and Schedule: {details?.schedule}</Text>
            </View>

            {/* Location */}
            <View style={styles.underline} />
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Location</Text>
            <TouchableOpacity onPress={() => openLocationInMaps(details?.address)}>
              <Text>
                <Ionicons name="location-sharp" size={24} color="gray" />
                {details?.address}
              </Text>
            </TouchableOpacity>

            {/* Job Description */}
            <View style={styles.underline} />
            <View style={styles.decsContainer}>
              <Markdown style={styles.markdownStyles}>
                {details?.decs?.markdown || details?.decs?.text || ""}
              </Markdown>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        {isApplied ? (
          <View style={styles.appliedContainer}>
            <Ionicons name='checkmark-circle' size={24} color='green' />
            <Text style={{ textAlign: 'center', color: 'green', fontSize: 18 }}>
              Applied
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.applyBtn}
            onPress={() => setShowModal(true)}
          >
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }}>
              Apply Now
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Applied Modal */}
      <Modal animationType="slide" visible={showModal}>
        <AppliedModal companyId={details?.id} hideModal={() => setShowModal(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    marginTop: 20,
  
    padding: 10,
  },
  horizontalLogo: {
    height: 100,
    width: "100%",
    resizeMode: "stretch",
    marginBottom: 10,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    height: "auto",
    marginBottom:20
  },
  logoContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: 90,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  logoCompany: {
    width: 70,
    height: 70,
  },
  underline: {
    marginTop: 10,
    height: 1,
    backgroundColor: "#ccc",
  },
  decsContainer: {
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonContainer: {
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
  },
  appliedContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  applyBtn: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 10,
    width: "80%",
  },
  companyName:{
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
});
