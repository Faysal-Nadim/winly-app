import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Button } from "react-native";
import WinlyColors from "../../assets/WinlyColors";
import { shareIcon } from "../../assets/images";
import CustomProgressBar from "./CustomProgressBar";
import { RegularView } from "../text/regular";

import Modal from "react-native-modal";
import { DetailsModal } from "../Modal/DetailsModal";

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
        marginBottom: 6,
        marginHorizontal: 12,
        height: 482,
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
        style={{ height: 260, width: "100%", borderRadius: 12 }}
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
          <RegularView>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: WinlyColors.primaryRed,
              }}
            >
              Win
            </Text>
          </RegularView>
          <RegularView>
            <Text style={{ fontSize: 16, fontWeight: 800 }}>{title}</Text>
          </RegularView>
          <RegularView>
            <Text style={{ fontSize: 14, fontWeight: 400 }}>
              {productTitle}
            </Text>
          </RegularView>
        </View>

        <Image
          source={{ uri: productImageUrl }}
          style={{
            height: 64,
            width: 64,
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
          marginTop: 18,
          marginBottom: 12,
        }}
      >
        <View>
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
              <RegularView>
                <Text style={{ color: "#fff", fontSize: 10, fontWeight: 600 }}>
                  {new Date().getTime() >= item?.validity
                    ? "Closed"
                    : "Add to Cart"}
                </Text>
              </RegularView>
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
