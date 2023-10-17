import { useNavigation } from "@react-navigation/native";
import { CardField, useConfirmSetupIntent } from "@stripe/stripe-react-native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../redux/helpers/axios";
import { MediumView } from "../components/text/medium";
import Toast from "react-native-toast-message";

/**
 * @author
 * @function AddCard
 **/
export const AddCard = ({
  setModalVisible,
  loadingState,
  setLoadingState,
  setMethods,
}) => {
  const [clientSecret, setClientSecret] = useState("");

  const user = useSelector((state) => state.auth.user);

  const { confirmSetupIntent, loading } = useConfirmSetupIntent();

  useEffect(() => {
    const data = { customer: user.stripe_id, email: user.email };
    axiosInstance
      .post(`/payment/stripe/create-setup-intent`, data)
      .then(async (res) => {
        const { clientSecret } = await res.data;
        setClientSecret(clientSecret);
      });
  }, []);

  const getCard = () => {
    setLoadingState(true);
    const data = { customer: user.stripe_id };
    axiosInstance
      .post(`/payment/stripe/get-payment-methods`, data)
      .then(async (res) => {
        setMethods(res.data.methods);
        setLoadingState(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadingState(false);
      });
  };

  const handlePayPress = async () => {
    const billingDetails = {
      email: user.email,
    };

    // Confirm the payment with the card details
    const { setupIntent, error } = await confirmSetupIntent(clientSecret, {
      paymentMethodType: "Card",
      paymentMethodData: {
        billingDetails,
      },
    });

    if (error) {
      setModalVisible(false);
      Toast.show({
        type: "error",
        text1: "Failed!",
        text2: `${error.message}`,
        visibilityTime: 1500,
      });
    } else if (setupIntent && setupIntent.status === "Succeeded") {
      getCard();
      setModalVisible(false);
      Toast.show({
        type: "success",
        text1: "Congratulations!",
        text2: "Card Authorized & Saved To Your Account!",
        visibilityTime: 1500,
      });
    }
  };

  return (
    <View
      style={{
        //   marginBottom: 6,
        //   marginHorizontal: 12,
        // height: "auto",
        // width: "auto",
        backgroundColor: "#ffffff",
        //   borderRadius: 12,
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
      }}
    >
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: "**** **** **** ****",
        }}
        cardStyle={{
          backgroundColor: "#FFFFFF",
          textColor: "#000000",
          borderColor: "#000000",
          borderWidth: 1,
          borderRadius: 10,
        }}
        style={{
          width: "100%",
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          console.log("cardDetails", cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log("focusField", focusedField);
        }}
      />
      <TouchableOpacity
        disabled={loading || loadingState}
        style={{
          backgroundColor: "black",
          height: 40,
          width: "100%",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          //   position: "absolute",
          //   bottom: 80,
        }}
        onPress={handlePayPress}
      >
        <MediumView>
          <Text style={{ color: "white", fontSize: 16 }}>
            {loading || loadingState ? "Processing..." : "Save Card"}
          </Text>
        </MediumView>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
