import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../redux/actions";
import { MediumView } from "../components/text/medium";
import { RegularView } from "../components/text/regular";
import { SemiBoldView } from "../components/text/semibold";
import { useNavigation } from "@react-navigation/native";

/**
 * @author
 * @function Account
 **/
export const Account = (props) => {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    dispatch(signout());
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: StatusBar.currentHeight - 10,
        marginBottom: StatusBar.currentHeight,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View
            style={{
              backgroundColor: "#fff",
              marginLeft: 10,
              marginRight: 10,
              marginTop: 16,
              padding: 20,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View>
                <Image
                  source={{ uri: auth?.user?.img?.url }}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 50,
                  }}
                />
              </View>
              <View style={{ alignItems: "center", marginTop: 10 }}>
                <SemiBoldView>
                  <Text style={{ fontSize: 17 }}>{auth.user.fullName}</Text>
                </SemiBoldView>
                <View style={{ alignItems: "center", marginTop: 10 }}>
                  <RegularView>
                    <Text style={{ textDecorationLine: "underline" }}>
                      {auth.user.email}
                    </Text>
                  </RegularView>
                  <RegularView>
                    <Text>
                      {auth.user.dialCode}
                      {auth.user.phone}
                    </Text>
                  </RegularView>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() =>
                  navigation.navigate("Profile", { user: auth?.user })
                }
              >
                <View
                  style={{
                    height: 50,
                    width: 50,
                    backgroundColor: "#FF3624",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                  }}
                >
                  <Image
                    source={require("../assets/profile.png")}
                    style={{ height: 25, width: 25, tintColor: "#fff" }}
                  />
                </View>
                <MediumView>Profile</MediumView>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => navigation.navigate("Ticket")}
              >
                <View
                  style={{
                    height: 50,
                    width: 50,
                    backgroundColor: "#FF3624",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                  }}
                >
                  <Image
                    source={require("../assets/ticket.png")}
                    style={{ height: 35, width: 35, tintColor: "#fff" }}
                  />
                </View>
                <MediumView>Tickets</MediumView>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => navigation.navigate("Offer")}
              >
                <View
                  style={{
                    height: 50,
                    width: 50,
                    backgroundColor: "#FF3624",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                  }}
                >
                  <Image
                    source={require("../assets/coupon.png")}
                    style={{ height: 25, width: 25, tintColor: "#fff" }}
                  />
                </View>
                <MediumView>Offer</MediumView>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() =>
                  navigation.navigate("Wallet", { user: auth?.user })
                }
              >
                <View
                  style={{
                    height: 50,
                    width: 50,
                    backgroundColor: "#FF3624",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                  }}
                >
                  <Image
                    source={require("../assets/wallet.png")}
                    style={{ height: 25, width: 25, tintColor: "#fff" }}
                  />
                </View>
                <MediumView>Wallet</MediumView>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 20,
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Notification", { user: auth?.user })
              }
              style={{
                backgroundColor: "#fff",
                marginTop: 10,
                padding: 10,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#EBEBEB",
                  height: 40,
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                }}
              >
                <Image
                  source={require("../assets/notification.png")}
                  style={{ height: 30, width: 30 }}
                />
              </View>
              <View
                style={{
                  marginLeft: 15,
                  marginRight: 15,
                }}
              >
                <MediumView>
                  <Text style={{ fontSize: 16 }}>Notification</Text>
                </MediumView>
              </View>
              <View style={{ position: "absolute", right: 15 }}>
                <Image
                  source={require("../assets/right-arrow.png")}
                  style={{ height: 20, width: 20 }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                marginTop: 10,
                padding: 10,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#EBEBEB",
                  height: 40,
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                }}
              >
                <Image
                  source={require("../assets/help.png")}
                  style={{ height: 30, width: 30 }}
                />
              </View>
              <View
                style={{
                  marginLeft: 15,
                  marginRight: 15,
                }}
              >
                <MediumView>
                  <Text style={{ fontSize: 16 }}>Support Center</Text>
                </MediumView>
              </View>
              <View style={{ position: "absolute", right: 15 }}>
                <Image
                  source={require("../assets/right-arrow.png")}
                  style={{ height: 20, width: 20 }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PaymentMethod", { user: auth?.user })
              }
              style={{
                backgroundColor: "#fff",
                marginTop: 10,
                padding: 10,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#EBEBEB",
                  height: 40,
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                }}
              >
                <Image
                  source={require("../assets/card.png")}
                  style={{ height: 25, width: 25 }}
                />
              </View>
              <View
                style={{
                  marginLeft: 15,
                  marginRight: 15,
                }}
              >
                <MediumView>
                  <Text style={{ fontSize: 16 }}>Payment Methods</Text>
                </MediumView>
              </View>
              <View style={{ position: "absolute", right: 15 }}>
                <Image
                  source={require("../assets/right-arrow.png")}
                  style={{ height: 20, width: 20 }}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("FAQ")}
              style={{
                backgroundColor: "#fff",
                marginTop: 10,
                padding: 10,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#EBEBEB",
                  height: 40,
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                }}
              >
                <MediumView>
                  <Text style={{ fontSize: 25 }}>?</Text>
                </MediumView>
              </View>
              <View
                style={{
                  marginLeft: 15,
                  marginRight: 15,
                }}
              >
                <MediumView>
                  <Text style={{ fontSize: 16 }}>FAQ</Text>
                </MediumView>
              </View>
              <View style={{ position: "absolute", right: 15 }}>
                <Image
                  source={require("../assets/right-arrow.png")}
                  style={{ height: 20, width: 20 }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                marginTop: 10,
                padding: 10,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => handleLogout()}
            >
              <View
                style={{
                  backgroundColor: "#EBEBEB",
                  height: 40,
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                }}
              >
                <Image
                  source={require("../assets/logout.png")}
                  style={{ height: 20, width: 20 }}
                />
              </View>
              <View
                style={{
                  marginLeft: 15,
                  marginRight: 15,
                }}
              >
                <MediumView>
                  <Text style={{ fontSize: 16 }}>Logout</Text>
                </MediumView>
              </View>
              <View style={{ position: "absolute", right: 15 }}>
                <Image
                  source={require("../assets/right-arrow.png")}
                  style={{ height: 20, width: 20 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RegularView>Version 1.0.1 (Beta)</RegularView>
        </View>
      </ScrollView>
      {auth?.loading && (
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
