import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux"; // Replace with your state management library
import { getCampaign } from "../redux/actions";
import { ScrollView } from "react-native-virtualized-view";
import WinlyColors from "../assets/WinlyColors";

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
    fontWeight: "bold",
    fontSize: 16,
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
    fontSize: 16,
  },
  tableDataIndex: { flex: 0.25 },
  noWinnersText: {
    fontSize: 14,
    marginTop: 2,
    textAlign: "center",
  },
});

export const Winner = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCampaign());
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
        marginTop: StatusBar.currentHeight,
      }}
    >
      <ScrollView style={{ paddingHorizontal: 16, marginTop: 20 }}>
        <Text style={styles.sectionTitle}>Our Winners</Text>
        {winnersData?.length > 0 ? (
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderIndexText}></Text>
              <Text style={styles.tableHeaderText}>Prize</Text>
              <Text style={styles.tableHeaderText}>Winner </Text>
              <Text style={styles.tableHeaderText}>Ticket Number</Text>
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
                <Text style={styles.tableDataIndex}>{index + 1}</Text>
                <Text style={styles.tableData}>{x.title}</Text>
                <Text style={styles.tableData}>{x.winner.userName}</Text>
                <Text style={styles.tableData}>{x.winner.ticketNumber}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View>
            <Text style={styles.noWinnersText}>No Winners Announced Yet</Text>
          </View>
        )}
      </ScrollView>
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
