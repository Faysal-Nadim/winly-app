import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MediumView } from "../components/text/medium";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../redux/helpers/axios";
import { useNavigation } from "@react-navigation/native";
import { orderPlace } from "../redux/actions";

/**
 * @author
 * @function Payment
 **/
export const Payment = ({
  totalPrice,
  setModalVisible,
  setLoadingState,
  loadingState,
  exchange,
  address,
}) => {
  const [clientSecret, setClientSecret] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.auth.user);

  const totalItem = cart.cartItems
    ? Object.keys(cart.cartItems).reduce(function (qty, key) {
        return qty + cart.cartItems[key].qty;
      }, 0)
    : 0;

  const handleOrder = async (cart, trxID) => {
    const order = {
      orderItems: cart.map((item) => {
        return {
          price: item.price,
          qty: item.qty,
          ticketQty:
            exchange === true
              ? item?.campaign?.ticketQty
              : item?.campaign?.ticketQtyGen,
          campaign_id: item.campaign._id,
        };
      }),
      orderTotal: totalPrice,
      orderID: Math.floor(100000 + Math.random() * 900000),
      address: address,
      trxID: trxID,
      email: user.email,
    };
    dispatch(orderPlace(order));
  };

  const { confirmPayment, loading } = useConfirmPayment();

  useEffect(() => {
    const data = {
      amount: totalPrice,
      customer: user.stripe_id,
      email: user.email,
    };
    axiosInstance
      .post(`/payment/stripe/create-intent`, data)
      .then(async (res) => {
        const { clientSecret } = await res.data;
        setClientSecret(clientSecret);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePayPress = async () => {
    // Gather the customer's billing information (for example, email)
    const billingDetails = {
      email: user.email,
    };

    // Confirm the payment with the card details
    const { paymentIntent, error } = await confirmPayment(clientSecret, {
      paymentMethodType: "Card",
      paymentMethodData: {
        billingDetails,
      },
    });

    if (error) {
      setModalVisible(false);
      navigation.navigate("Confirmation", {
        payment: "failed",
      });
    } else if (paymentIntent && paymentIntent.status === "Succeeded") {
      setLoadingState(true);
      handleOrder(cart?.cartItems, paymentIntent.id).then(() => {
        setModalVisible(false);
        navigation.navigate("Confirmation", {
          payment: "complete",
        });
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
            {loading || loadingState ? "Processing..." : "Pay Now"}
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
