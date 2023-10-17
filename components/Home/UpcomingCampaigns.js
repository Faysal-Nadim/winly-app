import React, { useRef, useState } from "react";
import { View, Text, Dimensions, FlatList } from "react-native";
import Modal from "react-native-modal";
import { DetailsModal } from "../Modal/DetailsModal";
import { UpcomingCampaignCard } from "./UpcomingCampaignCards";
import { RegularView } from "../text/regular";

/**
 * @author Md. Shefat Zeon
 * @function UpcomingCampaigns
 **/

export const UpcomingCampaigns = ({ data }) => {
  const flatlistRef = useRef();
  const screenWidth = Dimensions.get("window").width;

  const [isModalVisible, setModalVisible] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);
  return (
    <View style={{ width: screenWidth }}>
      <View
        style={{
          marginBottom: 12,
          paddingHorizontal: 20,
        }}
      >
        <RegularView>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            Running Campaigns
          </Text>
        </RegularView>
      </View>

      <Modal
        isVisible={isModalVisible}
        animationIn={"slideInUp"}
        animationInTiming={500}
        animationOut={"slideOutDown"}
        animationOutTiming={800}
        // backdropTransitionOutTiming={1000}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <View>
          <DetailsModal
            setModalVisible={setModalVisible}
            detailsData={clickedItem}
          />
        </View>
      </Modal>

      <FlatList
        data={data}
        ref={flatlistRef}
        // getItemLayout={getItemLayout}
        renderItem={({ item, index }) => (
          <UpcomingCampaignCard
            item={item}
            index={index}
            setClickedItem={setClickedItem}
            setModalVisible={setModalVisible}
            dataLength={data?.length}
          />
        )}
        keyExtractor={(item) => item._id}
        horizontal={true}
        pagingEnabled={true}
        // onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        // initialScrollIndex={activeIndex}
      />
    </View>
  );
};
