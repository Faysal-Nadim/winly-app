import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { SemiBoldView } from "../components/text/semibold";
import { RegularView } from "../components/text/regular";
import { MediumView } from "../components/text/medium";
import * as Font from "expo-font";
import { Payment } from "./payment";
import Modal from "react-native-modal";
import CheckBox from "react-native-check-box";

/**
 * @author
 * @function Checkout
 **/

const Width = Dimensions.get("window").width;

export const Checkout = ({ route }) => {
  const { container } = styles;

  const [loaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [payment, setPayment] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [exchange, setExchange] = useState(true);
  const [address, setAddress] = useState("N/A");

  const dispatch = useDispatch();

  useEffect(() => {
    Font.loadAsync({
      Sora: require("../assets/fonts/Sora-Regular.ttf"),
      Sora: {
        uri: require("../assets/fonts/Sora-Regular.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
    }).then(() => {
      setLoaded(true);
    });
  }, []);

  const cart = route.params.cart;
  const cartTotal =
    (cart.cartItems
      ? Object.keys(cart.cartItems).reduce((totalPrice, key) => {
          const { price, qty } = cart.cartItems[key];
          return totalPrice + price * qty;
        }, 0)
      : 0) + +(exchange === true ? 0 : 35);

  return (
    <>
      <SafeAreaView style={container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 80 }}
        >
          <View
            style={{
              margin: 8,
            }}
          >
            <SemiBoldView>
              <Text
                style={{
                  fontSize: 15,
                }}
              >
                Campaigns ({cart?.cartItems?.length})
              </Text>
            </SemiBoldView>
          </View>
          <View
            style={{
              marginLeft: 8,
              marginRight: 8,
            }}
          >
            {cart?.cartItems &&
              cart?.cartItems.map((item) => (
                <View
                  key={item._id}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    flexDirection: "row",
                    //   width: Width - 16,
                    marginTop: 5,
                  }}
                >
                  <View
                    style={{
                      padding: 5,
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      source={{ uri: item?.campaign?.img?.product }}
                      style={{
                        height: 80,
                        width: 80,
                        borderRadius: 10,
                      }}
                    />
                  </View>
                  <View style={{ justifyContent: "center" }}>
                    <RegularView>
                      <Text
                        style={{
                          fontSize: 14,
                        }}
                      >
                        {item?.campaign?.productTitle}
                      </Text>
                    </RegularView>
                    <View
                      style={{
                        marginTop: 5,
                      }}
                    >
                      <RegularView>
                        <Text
                          style={{
                            fontSize: 12,
                          }}
                        >
                          Win {item?.campaign?.title}
                        </Text>
                      </RegularView>
                    </View>
                    <View
                      style={{
                        marginTop: 5,
                        justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <MediumView>
                        <Text
                          style={{
                            fontSize: 13,
                            color: "#FF3624",
                          }}
                        >
                          AED {item?.price}
                        </Text>
                      </MediumView>
                      <MediumView>
                        <Text
                          style={{
                            fontSize: 13,
                            color: "#FF3624",
                          }}
                        >
                          Quantity - {item?.qty}
                        </Text>
                      </MediumView>

                      {/* <MediumView>
                      <Text>Item Total: AED {item?.price * item?.qty}</Text>
                    </MediumView> */}
                    </View>
                  </View>
                </View>
              ))}
          </View>
          <View
            style={{
              marginLeft: 8,
              marginRight: 8,
              marginBottom: 5,
              marginTop: 5,
              backgroundColor: "#fff",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <CheckBox
              style={{
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
              isChecked={exchange}
              onClick={() => setExchange(!exchange)}
              rightText="Exchange your product with a Ticket"
              rightTextStyle={{
                fontFamily: loaded ? "Sora-Medium" : null,
                fontSize: 15,
              }}
            />
          </View>
          {exchange ? null : (
            <View
              style={{
                marginLeft: 8,
                marginRight: 8,
                marginBottom: 5,
                marginTop: 5,
                backgroundColor: "#fff",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: loaded ? "Sora-Medium" : null,
                  marginLeft: 5,
                  fontSize: 16,
                }}
              >
                Full Address
              </Text>
              <TextInput
                placeholder="Complete Delivery Address (Including ZIP Code)"
                value={address}
                onChangeText={setAddress}
                aria-label="Address"
                style={{
                  fontFamily: loaded ? "Sora" : null,
                  fontSize: 15,
                  height: 100,
                  // width: Width - 35,
                  borderRadius: 10,
                  margin: 5,
                  padding: 10,
                  backgroundColor: "#fff",
                  borderColor: "#000",
                  borderWidth: 1,
                }}
                multiline={true}
                // keyboardType="email-address"
              />
            </View>
          )}
          <View
            style={{
              margin: 8,
              backgroundColor: "#fff",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <MediumView>
                <Text
                  style={{
                    fontSize: 13,
                  }}
                >
                  Sub Total
                </Text>
              </MediumView>
              <MediumView>
                <Text
                  style={{
                    fontSize: 13,
                  }}
                >
                  + AED {cartTotal}
                </Text>
              </MediumView>
            </View>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 5,
              }}
            >
              <MediumView>
                <Text
                  style={{
                    fontSize: 13,
                  }}
                >
                  VAT
                </Text>
              </MediumView>
              <MediumView>
                <Text
                  style={{
                    fontSize: 13,
                  }}
                >
                  + AED 0
                </Text>
              </MediumView>
            </View>
            {exchange ? null : (
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginTop: 5,
                }}
              >
                <MediumView>
                  <Text
                    style={{
                      fontSize: 13,
                    }}
                  >
                    Delivery Charge
                  </Text>
                </MediumView>
                <MediumView>
                  <Text
                    style={{
                      fontSize: 13,
                    }}
                  >
                    + AED 35
                  </Text>
                </MediumView>
              </View>
            )}
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 5,
              }}
            >
              <MediumView>
                <Text
                  style={{
                    fontSize: 13,
                  }}
                >
                  Discount (0%)
                </Text>
              </MediumView>
              <MediumView>
                <Text
                  style={{
                    fontSize: 13,
                  }}
                >
                  AED 0
                </Text>
              </MediumView>
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextInput
                value={coupon}
                placeholder="Enter Coupon Code (If Any)"
                onChangeText={setCoupon}
                style={{
                  // height: 38,
                  fontFamily: loaded ? "Sora" : null,
                  width: Width / 1.7,
                  borderRadius: 5,
                  borderColor: "#000",
                  borderWidth: 1,
                  padding: 3,
                  // backgroundColor: "#fff",
                }}
              />
              <TouchableOpacity
                style={{
                  width: 100,
                  backgroundColor: "#000",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 8,
                  borderRadius: 5,
                }}
              >
                <MediumView>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#fff",
                    }}
                  >
                    Apply
                  </Text>
                </MediumView>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={{ marginLeft: 8, marginRight: 8 }}>
          <MediumView>
            <Text
              style={{
                fontSize: 15,
                marginBottom: 5,
              }}
            >
              Payment Method
            </Text>
          </MediumView>
          <TouchableOpacity
            style={{
              backgroundColor: payment === "COD" ? "#EDFBEE" : "#fff",
              justifyContent: "center",
              padding: 5,
              marginTop: 5,
              borderRadius: 5,
              height: 50,
            }}
            onPress={() => setPayment("COD")}
          >
            {payment === "COD" ? (
              <View
                style={{
                  height: 50,
                  width: 5,
                  backgroundColor: "#53D451",
                  opacity: 1,
                  position: "absolute",
                  left: 0,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                }}
              />
            ) : null}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                resizeMode="contain"
                source={require("../assets/cod.png")}
                style={{
                  height: 50,
                  width: 50,
                  marginLeft: 10,
                }}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  fontSize: 15,
                  marginLeft: 5,
                }}
              >
                Cash On Delivery
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: payment === "bKash" ? "#EDFBEE" : "#fff",
              justifyContent: "center",
              padding: 5,
              marginTop: 5,
              borderRadius: 5,
              height: 50,
            }}
            onPress={() => setPayment("bKash")}
          >
            {payment === "bKash" ? (
              <View
                style={{
                  height: 50,
                  width: 5,
                  backgroundColor: "#53D451",
                  opacity: 1,
                  position: "absolute",
                  left: 0,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                }}
              />
            ) : null}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                // resizeMode="contain"
                source={require("../assets/bkash.png")}
                style={{
                  height: 50,
                  width: 50,
                }}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  fontSize: 15,
                }}
              >
                bKash Checkout
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: payment === "SSL" ? "#EDFBEE" : "#fff",
              justifyContent: "center",
              padding: 5,
              marginTop: 5,
              borderRadius: 5,
              height: 50,
              marginBottom: 100,
            }}
            onPress={() => setPayment("SSL")}
          >
            {payment === "SSL" ? (
              <View
                style={{
                  height: 50,
                  width: 5,
                  backgroundColor: "#53D451",
                  opacity: 1,
                  position: "absolute",
                  left: 0,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                }}
              />
            ) : null}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                resizeMode="contain"
                source={require("../assets/ssl.png")}
                style={{
                  height: 30,
                  width: 150,
                }}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Montserrat-Medium" : null,
                  fontSize: 15,
                }}
              >
                VISA/Mastercard
              </Text>
            </View>
          </TouchableOpacity>
        </View> */}
        </ScrollView>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            flexDirection: "row",
            backgroundColor: "#fff",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center",
            width: Width,
            height: Platform.OS === "android" ? 80 : 100,
          }}
        >
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <SemiBoldView>
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                Payable Total: AED {cartTotal}
              </Text>
            </SemiBoldView>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View
              style={{
                backgroundColor: "#FF3624",
                justifyContent: "center",
                alignItems: "center",
                padding: 8,
                borderRadius: 5,
              }}
            >
              <SemiBoldView>
                <Text
                  style={{
                    fontSize: 15,
                    color: "#fff",
                  }}
                >
                  Place Order
                </Text>
              </SemiBoldView>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
        <Payment
          totalPrice={cartTotal}
          setModalVisible={setModalVisible}
          setLoadingState={setLoadingState}
          exchange={exchange}
          address={address}
          loadingState={loadingState}
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
