import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { MediumView } from "../components/text/medium";
import { RegularView } from "../components/text/regular";
import { BoldView } from "../components/text/bold";
import { useDispatch, useSelector } from "react-redux";
import { getTicket } from "../redux/actions";

/**
 * @author
 * @function Tickets
 **/

const Height = Dimensions.get("window").height;
const Width = Dimensions.get("window").width;

export const Tickets = (props) => {
  const { container } = styles;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTicket());
  }, []);

  const ticket = useSelector((state) => state.ticket);

  return (
    <SafeAreaView style={container}>
      <View>
        {ticket?.tickets?.length > 0 &&
          ticket?.tickets?.map((ticket, i) => (
            <ImageBackground
              key={i}
              source={require("../assets/tickets-bg-white.png")}
              style={{
                height: Height / 8,
                width: "auto",
                overflow: "hidden",
                padding: 5,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  width: Width / 1.6,
                  borderStyle: "dashed",
                  borderRightWidth: 1,
                  borderColor: "#535353",
                }}
              >
                <BoldView>
                  <Text style={{ color: "#FF3624" }}>WIN</Text>
                </BoldView>
                <RegularView>
                  <Text style={{ fontSize: 12 }}>
                    {ticket?.campaign?.title} | {ticket?.ticketNumber}
                  </Text>
                </RegularView>
                <View style={{ flexDirection: "row", width: Width / 1.6 }}>
                  <TouchableOpacity
                    style={{
                      height: 25,
                      width: Width / 5.5,
                      backgroundColor: "#EEEEEE",
                      borderRadius: 5,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MediumView>
                      <Text style={{ fontSize: 10 }}>Campaign</Text>
                    </MediumView>
                  </TouchableOpacity>
                  <View
                    style={{
                      height: 25,
                      width: Width / 3,
                      backgroundColor: "#000",
                      borderRadius: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: 5,
                    }}
                  >
                    <MediumView>
                      <Text style={{ fontSize: 10, color: "white" }}>
                        Draw:{" "}
                        {ticket?.campaign?.displayStatus[0].status ===
                          "Upcoming" ||
                        ticket?.campaign?.displayStatus[0].status ===
                          "Selling Fast"
                          ? "TBA"
                          : `${ticket?.campaign?.drawDate} `}
                      </Text>
                    </MediumView>
                  </View>
                </View>
              </View>
            </ImageBackground>
          ))}
      </View>
      {ticket?.loading && (
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
    margin: StatusBar.currentHeight - 20,
  },
});
