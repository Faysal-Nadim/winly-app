import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCampaign } from "../redux/actions";
import { ScrollView } from "react-native-virtualized-view";
import WinlyColors from "../assets/WinlyColors";
import { SemiBoldView } from "../components/text/semibold";
import { MediumView } from "../components/text/medium";
import { RegularView } from "../components/text/regular";
import * as Font from "expo-font";

let winnerRawData = [
  {
    winner: {
      userName: "Muhammad Habib Chaudhry",
      ticketNumber: "WL-000001-Y",
      nationality: "Pakistan",
    },
    title: "USD 250",
  },
  {
    winner: {
      userName: "Adelina Paghubasan San Diego",
      ticketNumber: "WL-000002-Y",
      nationality: "Philippines",
    },
    title: "USD 250",
  },
  {
    winner: {
      userName: "Kumar Thapa",
      ticketNumber: "WL-000003-Y",
      nationality: "",
    },
    title: "USD 100",
  },
];

export const Winner = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCampaign());
  }, []);

  useEffect(() => {
    Font.loadAsync({
      Sora: require("../assets/fonts/Sora-Regular.ttf"),
      Sora: {
        uri: require("../assets/fonts/Sora-Regular.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
      "Sora-SemiBold": {
        uri: require("../assets/fonts/Sora-SemiBold.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
    }).then(() => {
      setLoaded(true);
    });
  }, []);

  const campaign = useSelector((state) => state.campaign);

  let winnersData = getNonNullWinnersData(
    campaign?.campaigns?.allCampaigns || []
  );
  winnersData.push(...winnerRawData);
  const screenWidth = Dimensions.get("window").width;

  return (
    <View
      style={{
        width: screenWidth,
        marginTop: 10,
      }}
    >
      <ScrollView style={{ paddingHorizontal: 16, marginTop: 20 }}>
        <View
          style={{ justifyContent: "center", alignItems: "center", margin: 20 }}
        >
          <SemiBoldView>
            <Text style={styles.sectionTitle}>Our Winners</Text>
          </SemiBoldView>
        </View>
        {winnersData?.length > 0 ? (
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderIndexText}></Text>
              <Text
                style={[
                  styles.tableHeaderText,
                  { fontFamily: loaded ? "Sora-SemiBold" : null },
                ]}
              >
                Prize
              </Text>
              <Text
                style={[
                  styles.tableHeaderText,
                  { fontFamily: loaded ? "Sora-SemiBold" : null },
                ]}
              >
                Winner
              </Text>

              <Text
                style={[
                  styles.tableHeaderText,
                  { fontFamily: loaded ? "Sora-SemiBold" : null },
                ]}
              >
                Ticket Number
              </Text>
            </View>
            {winnersData.reverse().map((x, index) => (
              <View
                style={
                  index + 1 == winnersData?.length
                    ? {
                        flexDirection: "row",
                        // borderBottomWidth: 1,
                        // borderColor: WinlyColors.grey,
                        backgroundColor: WinlyColors.lightGrey,
                        paddingVertical: 16,
                        paddingHorizontal: 10,
                        gap: 8,
                      }
                    : {
                        flexDirection: "row",
                        borderBottomWidth: 1,
                        borderColor: WinlyColors.grey,
                        backgroundColor: WinlyColors.lightGrey,
                        paddingVertical: 16,
                        paddingHorizontal: 10,
                        gap: 8,
                      }
                }
                key={index}
              >
                <RegularView>
                  <Text style={styles.tableDataIndex}>{index + 1}</Text>
                </RegularView>
                <Text
                  style={[
                    styles.tableData,
                    { fontFamily: loaded ? "Sora" : null },
                  ]}
                >
                  {x.title}
                </Text>
                <Text
                  style={[
                    styles.tableData,
                    { fontFamily: loaded ? "Sora" : null },
                  ]}
                >
                  {x.winner.userName}
                </Text>
                <Text
                  style={[
                    styles.tableData,
                    { fontFamily: loaded ? "Sora" : null },
                  ]}
                >
                  {x.winner.ticketNumber}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <View>
            <Text
              style={[
                styles.noWinnersText,
                { fontFamily: loaded ? "Sora" : null },
              ]}
            >
              No Winners Announced Yet
            </Text>
          </View>
        )}
      </ScrollView>
      {campaign?.loading && (
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
    </View>
  );
};

function getNonNullWinnersData(dataArray) {
  const nonNullWinners = dataArray.filter(
    (item) =>
      item.winner.nationality !== null ||
      item.winner.ticketNumber !== null ||
      item.winner.userName !== null
  );

  const result = nonNullWinners.map((item) => {
    return {
      title: item.title,
      _id: item._id,
      winner: item.winner,
    };
  });

  return result;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 28,
    marginBottom: 26,
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: WinlyColors.white,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: WinlyColors.grey,
    paddingHorizontal: 6,
    paddingVertical: 8,
    gap: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tableHeaderText: {
    flex: 1,
    // fontWeight: "bold",
    fontSize: 16,
    // fontFamily: loaded,
  },
  tableHeaderIndexText: { flex: 0.25 },
  tableRow: {
    flexDirection: "row",

    borderBottomWidth: 1,
    borderColor: WinlyColors.grey,
    paddingVertical: 16,
    paddingHorizontal: 10,
    gap: 8,
  },
  tableData: {
    flex: 1,
    fontSize: 13,
  },
  tableDataIndex: { flex: 0.25 },
  noWinnersText: {
    fontSize: 14,
    marginTop: 2,
    textAlign: "center",
  },
});
