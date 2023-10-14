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
// import * as Font from "expo-font";
import { ManropeRegular } from "../components/text/ManropeRegular";

let winnerRawData = [
  {
    winner: {
      userName: "Muhammad Habib Chaudhry",
      ticketNumber: "WL-000001-Y",
      nationality: "Pakistan",
    },
    title: "USD 250 Cash",
  },
  {
    winner: {
      userName: "Adelina Paghubasan San Diego",
      ticketNumber: "WL-000002-Y",
      nationality: "Philippines",
    },
    title: "USD 250 Cash",
  },
  {
    winner: {
      userName: "Kumar Thapa",
      ticketNumber: "WL-000003-Y",
      nationality: "",
    },
    title: "USD 100 Cash",
  },
];

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

export const Winner = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCampaign());
  }, []);

  // useEffect(() => {
  //   Font.loadAsync({
  //     Sora: require("../assets/fonts/Sora-Regular.ttf"),
  //     Sora: {
  //       uri: require("../assets/fonts/Sora-Regular.ttf"),
  //       display: Font.FontDisplay.FALLBACK,
  //     },
  //     "Sora-SemiBold": {
  //       uri: require("../assets/fonts/Sora-SemiBold.ttf"),
  //       display: Font.FontDisplay.FALLBACK,
  //     },
  //   }).then(() => {
  //     setLoaded(true);
  //   });
  // }, []);

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
      <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
        <SemiBoldView style={styles.sectionTitle}>Our Winners</SemiBoldView>

        {winnersData?.length > 0 ? (
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <SemiBoldView style={styles.tableHeaderText}>Prize</SemiBoldView>
              <SemiBoldView style={styles.tableHeaderText}>Winner</SemiBoldView>
              <SemiBoldView style={styles.tableHeaderText}>
                Ticket Number
              </SemiBoldView>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {winnersData.reverse().map((x, index) => (
                <View
                  style={
                    index + 1 === winnersData?.length
                      ? {
                          flexDirection: "row",
                          // borderBottomWidth: 1,
                          // borderColor: WinlyColors.grey,
                          backgroundColor: WinlyColors.white,
                          paddingVertical: 16,
                          paddingHorizontal: 10,
                          gap: 8,
                        }
                      : {
                          flexDirection: "row",
                          borderBottomWidth: 1,
                          borderColor: WinlyColors.grey,
                          backgroundColor: WinlyColors.white,
                          paddingVertical: 16,
                          paddingHorizontal: 10,
                          gap: 8,
                        }
                  }
                  key={index}
                >
                  {/* <ManropeRegular style={styles.tableDataIndex}>
                    {index + 1}.
                  </ManropeRegular> */}

                  <ManropeRegular style={styles.tableData}>
                    {index + 1}. {x.title}
                  </ManropeRegular>

                  <ManropeRegular style={styles.tableData}>
                    {x.winner.userName}
                  </ManropeRegular>
                  <ManropeRegular style={styles.tableData}>
                    {x.winner.ticketNumber}
                  </ManropeRegular>
                </View>
              ))}
            </ScrollView>
          </View>
        ) : (
          <View
            style={{
              marginTop: 100,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ManropeRegular>No Winners Announced Yet</ManropeRegular>
          </View>
        )}

      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 36,
    marginTop: 26,
    textAlign: "center",
    // color: WinlyColors.primaryRed,
  },
  table: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: WinlyColors.lightGrey,

    marginBottom: 451,
    // borderWidth: 1,
    // borderColor: "#000",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: WinlyColors.grey,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tableHeaderText: {
    flex: 1,
    // fontWeight: "bold",
    fontSize: 14,
    // fontFamily: loaded,
    paddingHorizontal: 0,
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
  tableDataIndex: { flex: 0.2 },
  noWinnersText: {
    fontSize: 14,
    marginTop: 2,
    textAlign: "center",
  },
});
