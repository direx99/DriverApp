import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../Styles.js";
import mail from "../assets/Login/mail.png";
import passwordimg from "../assets/Login/password.png";
import bus from "../assets/Login/bus.png";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      //console.log(response);
      //alert("Check your emails !");
    } catch (error) {
      console.log(error);
      alert("Sign in failed :" + error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={[styles.ScreenContainer, { padding: 50 }]}>
      <View style={{ marginTop: 90 }}>
        <Text style={styles.TitlelLogin}>Login</Text>

        <View style={{ gap: 20 }}>
          <View style={[styles.flexStyle, { marginTop: 50 }]}>
            <View style={styles.iconFill}>
              <Image source={mail} style={styles.iconStyle} />
            </View>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.inputStyle}
              placeholder="Email Address"
            />
          </View>

          <View style={styles.flexStyle}>
            <View style={styles.iconFill}>
              <Image source={passwordimg} style={styles.iconStyle} />
            </View>
            <TextInput
              style={styles.inputStyle}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              secureTextEntry={true}
            />
          </View>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPw}>Forgot Password?</Text>
        </TouchableOpacity>

        <View
          style={{
            marginTop: 50,
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            alignSelf: "center",
          }}
        >
          <View style={styles.ruler} />
          <Text style={styles.orStyle}>OR</Text>
          <View style={styles.ruler} />
        </View>

        <TouchableOpacity
          onPress={signIn}
          style={{
            backgroundColor: "#A4D357",
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            zIndex: 100,
            marginVertical: 20,
            borderRadius: 10,
          }}
        >
            <Text>Login</Text>
        </TouchableOpacity>

        <View
          style={{
            marginTop: 14,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            alignSelf: "center",
          }}
        >
          <Text style={styles.signupStyle}>Dont't have an account?</Text>

          <TouchableOpacity>
            <Text style={styles.signupStyle1}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <Image source={bus} style={styles.busStyle} />
      </View>
    </View>
  );
};

export default Login;
