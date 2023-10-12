import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { SemiBoldView } from "../components/text/semibold";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getCartItems, removeCart, updateCart } from "../redux/actions";
import { MediumView } from "../components/text/medium";
import { RegularView } from "../components/text/regular";

/**
 * @author
 * @function Cart
 **/

export const Cart = (props) => {
  const { container } = styles;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loaded, setLoaded] = useState(false);
  const [exchangeProductWithTickets, setExchangeProductWithTickets] =
    useState(true);

  const cart = useSelector((state) => state.cart.cart);
  const cartState = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  let totalItem = cart.cartItems
    ? Object.keys(cart.cartItems).reduce(function (qty, key) {
        return qty + cart.cartItems[key].qty;
      }, 0)
    : 0;

  let productTotal = cart.cartItems
    ? Object.keys(cart.cartItems).reduce((totalPrice, key) => {
        const { price, qty } = cart.cartItems[key];
        return totalPrice + price * qty;
      }, 0)
    : 0;

  let totalPrice =
    (cart.cartItems
      ? Object.keys(cart.cartItems).reduce((totalPrice, key) => {
          const { price, qty } = cart.cartItems[key];
          return totalPrice + price * qty;
        }, 0)
      : 0) +
    +(exchangeProductWithTickets === true ? 0 : 35) -
    user?.wallet?.available;

  const handleCart = ({ productData, qty }) => {
    const item = {
      _id: productData.campaign._id,
      price: productData.price,
    };
    dispatch(updateCart(item, qty));
  };

  const handleCartRemove = (item) => {
    const data = {
      _id: item._id,
    };
    dispatch(removeCart(data));
  };

  return (
    <SafeAreaView style={container}>
      {cart?.cartItems?.length > 0 ? (
        <>
          <View
            style={{
              marginTop: 20,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <SemiBoldView>
              <Text style={{ fontSize: 20 }}>
                Cart ({totalItem} {totalItem <= 1 ? "Item" : "Items"})
              </Text>
            </SemiBoldView>
          </View>
          <View>
            {cart?.cartItems &&
              cart?.cartItems?.map((item) => (
                <View
                  key={item._id}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    flexDirection: "row",
                    marginTop: 10,
                    // width: Width - StatusBar.currentHeight,
                  }}
                >
                  <View
                    style={{
                      padding: 10,
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
                    <View>
                      <MediumView>
                        <Text
                          style={{
                            fontSize: 14,
                          }}
                        >
                          {item?.campaign?.productTitle.slice(0, 28)}
                        </Text>
                      </MediumView>
                    </View>
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
                      }}
                    >
                      <View>
                        <MediumView>
                          <Text
                            style={{
                              fontSize: 15,
                              color: "#FF3624",
                            }}
                          >
                            AED {item?.price}
                          </Text>
                        </MediumView>
                      </View>
                      <View
                        style={{
                          justifyContent: "center",
                          flexDirection: "row",
                        }}
                      >
                        <TouchableOpacity
                          disabled={item.qty <= 1 ? true : false}
                          style={{
                            backgroundColor: "#E9E9E9",
                            width: 25,
                            height: 25,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 3,
                            marginRight: 5,
                          }}
                          onPress={() =>
                            handleCart({ productData: item, qty: -1 })
                          }
                        >
                          <RegularView>
                            <Text
                              style={{
                                fontSize: 15,
                              }}
                            >
                              -
                            </Text>
                          </RegularView>
                        </TouchableOpacity>
                        <View
                          style={{
                            backgroundColor: "#E9E9E9",
                            width: 25,
                            height: 25,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 3,
                            marginRight: 5,
                          }}
                        >
                          <RegularView>{item?.qty}</RegularView>
                        </View>
                        <TouchableOpacity
                          style={{
                            backgroundColor: "#E9E9E9",
                            width: 25,
                            height: 25,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 3,
                          }}
                          onPress={() =>
                            handleCart({ productData: item, qty: 1 })
                          }
                        >
                          <Text
                            style={{
                              fontFamily: loaded ? "Montserrat-SemiBold" : null,
                            }}
                          >
                            +
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      justifyContent: "center",

                      alignItems: "center",
                      marginLeft: 20,
                    }}
                    onPress={() => handleCartRemove(item)}
                  >
                    <Image
                      resizeMode="contain"
                      source={require("../assets/trash.png")}
                      style={{
                        height: 18,
                        width: 18,
                        tintColor: "#FF3624",
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ))}
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "black",
              height: 40,
              width: "100%",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: Platform.OS === "android" ? 80 : 100,
            }}
            onPress={() =>
              navigation.navigate("Checkout", {
                cart: cart,
                cartTotal: productTotal,
                totalItem: totalItem,
              })
            }
          >
            <MediumView>
              <Text style={{ color: "white", fontSize: 16 }}>
                Proceed to Checkout
              </Text>
            </MediumView>
          </TouchableOpacity>
        </>
      ) : (
        <View
          style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
        >
          <SemiBoldView>
            <Text style={{ fontSize: 17 }}>Your Cart Is Empty!</Text>
          </SemiBoldView>
          <TouchableOpacity
            style={{ margin: 20 }}
            onPress={() => navigation.navigate("Home")}
          >
            <View
              style={{
                width: 160,
                height: 50,
                backgroundColor: "#FF3624",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <RegularView>
                <Text
                  style={{
                    color: "#fff",
                  }}
                >
                  Start Shopping
                </Text>
              </RegularView>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {cartState.loading && (
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
  dot: {
    margin: 5,
    height: 5,
    width: 10,
    borderRadius: 5,
    backgroundColor: "black",
  },
});
