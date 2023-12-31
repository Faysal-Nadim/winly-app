import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import axiosInstance from "../redux/helpers/axios";
import { SemiBoldView } from "../components/text/semibold";
import { BoldView } from "../components/text/bold";
import { MediumView } from "../components/text/medium";
import { RegularView } from "../components/text/regular";
import { AddCard } from "./add-card";
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";

/**
 * @author
 * @function PaymentMethod
 **/

export const PaymentMethod = ({ route }) => {
  const user = route.params.user;
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    setLoading(true);
    const data = { customer: user.stripe_id };
    axiosInstance
      .post(`/payment/stripe/get-payment-methods`, data)
      .then(async (res) => {
        setMethods(res.data.methods);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const getCard = () => {
    setLoading(true);
    const data = { customer: user.stripe_id };
    axiosInstance
      .post(`/payment/stripe/get-payment-methods`, data)
      .then(async (res) => {
        setMethods(res.data.methods);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleRemoveCard = (card) => {
    setLoadingState(true);
    const data = { cardID: card.id };
    axiosInstance
      .post("/payment/stripe/delete-saved-card", data)
      .then((res) => {
        getCard();
        setLoadingState(false);
        Toast.show({
          type: "success",
          text1: `${res.data.msg}`,
          visibilityTime: 1500,
        });
      })
      .catch((err) => {
        setLoadingState(true);
        Toast.show({
          type: "error",
          text1: `${err.response.data.msg}`,
          visibilityTime: 1500,
        });
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {methods?.length > 0 ? (
          methods?.map((cardInfo, i) => (
            <View
              key={i}
              style={{
                backgroundColor: "#fff",
                marginBottom: 10,
                padding: 15,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  {cardInfo.card.brand === "mastercard" ? (
                    <Image
                      source={require("../assets/mc.png")}
                      resizeMode="contain"
                      style={{ height: 30, width: 50 }}
                    />
                  ) : (
                    <Image
                      source={require("../assets/visa.png")}
                      resizeMode="contain"
                      style={{ height: 30, width: 50 }}
                    />
                  )}
                </View>
                <TouchableOpacity
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#E8E8E8",
                  }}
                  onPress={() => handleRemoveCard(cardInfo)}
                >
                  <Image
                    source={require("../assets/trash.png")}
                    resizeMode="contain"
                    style={{ height: 20, width: 20 }}
                  />
                </TouchableOpacity>
              </View>
              <BoldView>{cardInfo?.card?.funding.toUpperCase()}</BoldView>
              <MediumView>**** **** **** {cardInfo?.card?.last4}</MediumView>
              <RegularView>
                {cardInfo?.card?.exp_month <= 9
                  ? `0${cardInfo?.card?.exp_month}`
                  : cardInfo?.card?.exp_month}{" "}
                / {cardInfo?.card?.exp_year}
              </RegularView>
              <RegularView>{cardInfo?.card?.country}</RegularView>
            </View>
          ))
        ) : (
          <View
            style={{
              margin: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MediumView>
              <Text style={{ fontSize: 18 }}>No Cards Found</Text>
            </MediumView>
          </View>
        )}
        <TouchableOpacity
          style={{
            marginTop: 3,
            borderRadius: 5,
            backgroundColor: "#FF3624",
            justifyContent: "center",
            alignItems: "center",
            padding: 3,
            height: 40,
          }}
          onPress={() => setModalVisible(true)}
        >
          <SemiBoldView>
            <Text style={{ fontSize: 16, color: "#fff" }}>Add New</Text>
          </SemiBoldView>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={isModalVisible}
        animationIn={"fadeIn"}
        // animationOut={"fadeOut"}
        animationOutTiming={500}
        // backdropTransitionOutTiming={1000}
        onBackButtonPress={() => setModalVisible(false)}
        style={{
          justifyContent: Platform.OS === "android" ? "flex-end" : "center",
          margin: 0,
        }}
      >
        <AddCard
          setModalVisible={setModalVisible}
          setLoadingState={setLoadingState}
          loadingState={loadingState}
          setMethods={setMethods}
        />
      </Modal>
      {loadingState && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: "#f3f3f3",
            opacity: 0.5,
          }}
        >
          <Image
            source={require("../assets/loading.gif")}
            style={{ height: 40, width: 40 }}
          />
        </View>
      )}
      {loading && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: "#f3f3f3",
            opacity: 0.5,
          }}
        >
          <Image
            source={require("../assets/loading.gif")}
            style={{ height: 40, width: 40 }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});
