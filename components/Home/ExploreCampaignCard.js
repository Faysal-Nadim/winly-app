import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Button } from "react-native";
import WinlyColors from "../../assets/WinlyColors";
import { shareIcon } from "../../assets/images";
import CustomProgressBar from "./CustomProgressBar";
import { RegularView } from "../text/regular";

import Modal from "react-native-modal";
import { DetailsModal } from "../Modal/DetailsModal";
import { BoldView } from "../text/bold";
import { ManropeRegular } from "../text/ManropeRegular";
import { SemiBoldView } from "../text/semibold";

/**
 * @author
 * @function ExploreCampaignCard
 **/
export const ExploreCampaignCard = ({ item, index }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  // DATA EXTRACT
  let imageUrl = item?.img?.prize;
  let title = item?.title;
  let productTitle = item?.productTitle;
  let productImageUrl = item?.img?.product;

  let sold = item?.orderCount;
  let stock = item?.stockQty;
  let status = item?.displayStatus?.find((x) => x?.status == "Upcoming");

  return (
    <View
      style={{
        marginBottom: 8,
        marginHorizontal: 14,
        minHeight: 500,
        width: "auto",
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 12,
      }}
    >
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
          <DetailsModal setModalVisible={setModalVisible} detailsData={item} />
        </View>
      </Modal>
      {/* IMAGE OF THE PRIZE */}
      <Image
        source={{ uri: imageUrl }}
        style={{
          height: 286,
          width: "100%",
          borderRadius: 12,
          borderColor: WinlyColors.offWhite,
          borderWidth: 0.0,
        }}
      />

      {/* TITLE, PRICE, PRODUCT TITLE, PRODUCT IMAGE */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginVertical: 18,
        }}
      >
        <View>
          <BoldView
            style={{
              fontSize: 18,
              color: WinlyColors.primaryRed,
            }}
          >
            Win
          </BoldView>
          <BoldView style={{ fontSize: 18 }}>{title}</BoldView>
          <ManropeRegular style={{ fontSize: 14 }}>
            {productTitle}
          </ManropeRegular>
        </View>

        <Image
          source={{ uri: productImageUrl }}
          style={{
            height: 68,
            width: 68,
            borderRadius: 8,
            borderColor: WinlyColors.offWhite,
            borderWidth: 0.5,
          }}
        />
      </View>

      {/* DIVIDER */}

      <View style={{ borderColor: WinlyColors.offWhite, borderWidth: 1 }} />

      {/* PROGRESSBAR, ADD TO CART, SHARE */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 24,
          marginBottom: 12,

          // borderColor: WinlyColors.primaryRed,
          // borderWidth: 3.0,
        }}
      >
        <View
          style={{
            marginTop: -14,
          }}
        >
          <CustomProgressBar
            sold={sold}
            stock={stock}
            status={status?.status ? true : false}
          />
        </View>
        {/* Add to cart, share */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 8,

            // borderColor: WinlyColors.offWhite,
            // borderWidth: 4.0,
          }}
        >
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            disabled={
              item?.displayStatus[0].status === "Upcoming" ||
              new Date().getTime() >= item?.validity
                ? true
                : false
            }
          >
            <View
              style={{
                backgroundColor: WinlyColors.primaryRed,
                // paddingVertical: 14,
                paddingHorizontal: 16,
                height: 46,
                borderRadius: 8,
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <SemiBoldView style={{ color: "#fff", fontSize: 10 }}>
                {new Date().getTime() >= item?.validity
                  ? "Closed"
                  : "Add to Cart"}
              </SemiBoldView>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // Handle touch here
            }}
          >
            <View
              style={{
                backgroundColor: WinlyColors.btnbG,
                // paddingVertical: 14,
                paddingHorizontal: 16,
                height: 46,
                borderRadius: 8,
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Image
                source={shareIcon}
                style={{
                  height: 22,
                  width: 22,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
