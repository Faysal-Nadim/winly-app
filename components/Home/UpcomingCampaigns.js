import React, { useRef } from "react";
import { View, Text, Dimensions, FlatList } from "react-native";
import { UpcomingCampaignCard } from "./UpcomingCampaignCards";
import { RegularView } from "../text/regular";

/**
 * @author Md. Shefat Zeon
 * @function UpcomingCampaigns
 **/

// let data = [
//   {
//     img: {
//       prize: "https://i.ibb.co/vz88549/shutterstock-2127128198.jpg",
//       product:
//         "https://i.ibb.co/rdDbrTy/Whats-App-Image-2023-08-09-at-14-53-41.jpg",
//     },
//     winner: {
//       nationality: null,
//       ticketNumber: null,
//       userName: null,
//     },
//     offer: {
//       validity: 0,
//       percentage: 0,
//       minAmount: 0,
//     },
//     _id: "64b57e8dd277b4a804792b5a",
//     title: "AED 35,000 Cash",
//     productTitle: "Spend AED 25 for a chance to win.",
//     validity: 1697306400000,
//     ticketQty: 2,
//     price: 25,
//     stockQty: 2500,
//     orderCount: 479,
//     drawDate: "Sun Oct 15 2023",
//     status: "Published",
//     displayStatus: [
//       {
//         status: "Hero",
//         _id: "651fcd1ed9b668bbeeac9d07",
//       },
//       {
//         status: "Explore",
//         _id: "651fcd1ed9b668bbeeac9d08",
//       },
//     ],
//     description: "AED 35,000 Cash",
//     ticketQtyGen: 1,
//     createdAt: "2023-07-17T17:46:53.862Z",
//     updatedAt: "2023-10-08T11:21:17.697Z",
//     __v: 0,
//     prizeDiscription: "Winly Rubber Band </br> Color - Red",
//   },
//   {
//     img: {
//       prize: "https://i.ibb.co/C63xMYW/shutterstock-185525042-1.jpg",
//       product:
//         "https://i.ibb.co/zQfP1gx/Whats-App-Image-2023-08-09-at-14-53-41.jpg",
//     },
//     winner: {
//       nationality: null,
//       ticketNumber: null,
//       userName: null,
//     },
//     offer: {
//       validity: 0,
//       percentage: 0,
//       minAmount: 0,
//     },
//     _id: "64b82833d88befeb9a124a6d",
//     title: "AED 75,000 Cash",
//     productTitle: "Spend AED 150 for a chance to win",
//     validity: 1703872800000,
//     ticketQty: 2,
//     price: 150,
//     stockQty: 750,
//     orderCount: 5,
//     drawDate: "Fri Dec 29 2023",
//     status: "Published",
//     displayStatus: [
//       {
//         status: "Selling Fast",
//         _id: "651fcd3ad9b668bbeeac9d17",
//       },
//       {
//         status: "Explore",
//         _id: "651fcd3ad9b668bbeeac9d18",
//       },
//     ],
//     description: "AED 75,000 Cash",
//     ticketQtyGen: 1,
//     createdAt: "2023-07-19T18:15:15.031Z",
//     updatedAt: "2023-10-06T09:02:50.168Z",
//     __v: 0,
//     prizeDiscription: "Winly Rubber Band </br> Color - Red",
//   },
//   {
//     img: {
//       prize: "https://i.ibb.co/RjbQ35Q/shutterstock-2127128198-1.jpg",
//       product:
//         "https://i.ibb.co/TmxbK8R/Whats-App-Image-2023-08-09-at-14-53-41.jpg",
//     },
//     winner: {
//       ticketNumber: null,
//       userName: null,
//       nationality: null,
//     },
//     offer: {
//       validity: 0,
//       percentage: 0,
//       minAmount: 0,
//     },
//     _id: "64fdf70774a1c77e08b01f3d",
//     title: "AED 5,000 Cash",
//     productTitle: "Spend AED 20 for a chance to win",
//     validity: 1703872800000,
//     ticketQty: 2,
//     price: 20,
//     stockQty: 500,
//     orderCount: 18,
//     drawDate: "Fri Dec 29 2023",
//     status: "Published",
//     displayStatus: [
//       {
//         status: "Selling Fast",
//         _id: "651fcdc6d9b668bbeeac9d53",
//       },
//       {
//         status: "Explore",
//         _id: "651fcdc6d9b668bbeeac9d54",
//       },
//     ],
//     description: "AED 5,000 Cash",
//     prizeDiscription: "Winly Rubber Band </br> Color - Red",
//     ticketQtyGen: 1,
//     createdAt: "2023-09-10T17:04:07.875Z",
//     updatedAt: "2023-10-06T21:56:51.617Z",
//     __v: 0,
//   },
// ];

export const UpcomingCampaigns = ({ data }) => {
  const flatlistRef = useRef();
  const screenWidth = Dimensions.get("window").width;
  return (
    <View style={{ width: screenWidth }}>
      <View
        style={{
          marginBottom: 24,
          paddingHorizontal: 10,
        }}
      >
        <RegularView>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            Running Campaigns
          </Text>
        </RegularView>
      </View>

      <FlatList
        data={data}
        ref={flatlistRef}
        // getItemLayout={getItemLayout}
        renderItem={({ item, index }) => (
          <UpcomingCampaignCard
            item={item}
            index={index}
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
