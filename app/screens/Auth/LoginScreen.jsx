import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

const Strategy = {
  Google: "oauth_google",
  Facebook: "oauth_facebook",
};
export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });

  const onSelectAuth = async (strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };
  return (
    <View style={{ paddingTop: 30 }}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={{ width: 120, height: 120 }}
        />
        <View style={styles.logoText}>
          <Text style={styles.text}>Employment</Text>
          <Text style={styles.text}>Navigator</Text>
          <Text style={styles.textsub}>
            AN APPLICATION THAT HELPS YOU APPLY FOR A JOB
          </Text>
        </View>
        <View style={{ marginTop: 80}}>
          <TouchableOpacity
            style={styles.authLogoContainer}
            onPress={() => onSelectAuth(Strategy.Google)}
          >
            <Image
              source={require("../../../assets/images/google.png")}
              style={styles.googleLogo}
            />
            <Text>Continue with google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.authLogoContainer}
            onPress={() => onSelectAuth(Strategy.Facebook)}
          >
            <Image
              source={require("../../../assets/images/facebook.png")}
              style={styles.facebookLogo}
            />
            <Text>Continue with facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginTop: 50,
    justifyContent: "center",
  },
  logoText: {
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
  },
  textsub: {
    fontSize: 15,
    color: "#5BBCFF",
  },
  authLogoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    width: 300,
    borderColor: "#ccc",
    marginBottom: 20,
   

  },
  googleLogo: {
    width: 30,
    height: 50,
    marginEnd: 10,
   
  },
  facebookLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
   
  },
});
