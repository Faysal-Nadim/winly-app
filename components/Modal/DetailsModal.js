import React, { useState } from "react";
// import { ScrollView } from "react-native-virtualized-view";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import WinlyColors from "../../assets/WinlyColors";

/**
 * @author
 * @function DetailsModal
 **/

const TextComponent = ({ text }) => {
  return (
    <Text
      style={{
        fontSize: 12,
        fontWeight: 600,
        color: WinlyColors.offBlack,
        marginHorizontal: 6,
        marginBottom: 4,
      }}
    >
      {text}
    </Text>
  );
};

const CustomButtonHandler = ({
  onPress,
  disabledCondition,
  btnText,
  bgColor,
  textColor,
  textSize,
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: bgColor ? bgColor : WinlyColors.offWhite, // Replace with your desired background color
        borderRadius: 18,
        paddingVertical: 6,
        paddingHorizontal: 12,
        minWidth: 60,
        justifyContent: "center",
      }}
      onPress={onPress}
      disabled={disabledCondition}
    >
      <Text
        style={{
          color: textColor ? textColor : WinlyColors.black, // Replace with your desired text color
          fontSize: textSize ? textSize : 14,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {btnText}
      </Text>
    </TouchableOpacity>
  );
};

export const DetailsModal = ({ data, handleHide }) => {
  // QUANTITY HANDELERS
  const [productQty, setProductQty] = useState(1);
  const handleIncreaseProductQty = () => {
    setProductQty((current) => current + 1);
  };
  const handleDecreaseProductQty = () => {
    if (productQty != 0) setProductQty((current) => current - 1);
  };

  // CART HANDLERS

  const handleAddToCart = () => {};
  const handleCloseModal = () => {};

  // DATA EXTRACTION
  //   detailsData = data?.length != 0 ? data[0] : null;
  let detailsData = {
    __v: 0,
    _id: "64b57e8dd277b4a804792b5a",
    createdAt: "2023-07-17T17:46:53.862Z",
    description: "AED 35,000 Cash",
    displayStatus: [
      { _id: "651fcd1ed9b668bbeeac9d07", status: "Hero" },
      { _id: "651fcd1ed9b668bbeeac9d08", status: "Explore" },
    ],
    drawDate: "Sun Oct 15 2023",
    img: {
      prize: "https://i.ibb.co/vz88549/shutterstock-2127128198.jpg",
      product:
        "https://i.ibb.co/rdDbrTy/Whats-App-Image-2023-08-09-at-14-53-41.jpg",
    },
    offer: { minAmount: 0, percentage: 0, validity: 0 },
    orderCount: 839,
    price: 25,
    prizeDiscription: "Winly Rubber Band </br> Color - Red",
    productTitle: "Spend AED 25 for a chance to win.",
    status: "Published",
    stockQty: 2500,
    ticketQty: 2,
    ticketQtyGen: 1,
    title: "AED 35,000 Cash",
    updatedAt: "2023-10-10T20:24:43.177Z",
    validity: 1697306400000,
    winner: { nationality: null, ticketNumber: null, userName: null },
  };
  detailsData = data;
  let prizeImageUrl = detailsData?.img?.prize;
  let title = detailsData?.title;
  let productTitle = detailsData?.productTitle;
  let productImageUrl = detailsData?.img?.product;

  let price = detailsData?.price;
  let draw_date = detailsData?.drawDate;
  let description = detailsData?.prizeDiscription;
  let status = item?.displayStatus?.find((x) => x?.status == "Upcoming");
  let closing_date =
    detailsData?.validity != 0 || detailsData?.validity != null
      ? new Date(detailsData?.validity || 0).toLocaleDateString("en-us", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "To be announced";

  return (
    <SafeAreaView>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <View
        style={{
          marginBottom: 6,
          marginHorizontal: 12,
          height: "auto",
          width: "auto",
          backgroundColor: "#ffffff",
          borderRadius: 12,
        }}
      >
        {/* DESCRIPTION/DETAILS PART */}
        <View
          style={{
            padding: 12,
          }}
        >
          {/* PRODUCT IMAGE */}
          <Image
            source={{ uri: productImageUrl }}
            style={{
              height: 260,
              width: "100%",
              borderRadius: 12,
              marginBottom: 16,
            }}
          />
          {/* PRODUCT TITLE */}
          <Text style={{ fontSize: 16, fontWeight: 800, marginHorizontal: 6 }}>
            {productTitle}
          </Text>
          {/* PRODUCT PRICE */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: WinlyColors.primaryRed,
              marginHorizontal: 6,
              marginBottom: 16,
            }}
          >
            PRICE: AED {price}
          </Text>

          {/* CAMPAIGN DETAILS STAMP */}

          <View
            style={{
              justifyContent: "center", // Center vertically
              alignItems: "center", // Center horizontally
            }}
          >
            <View
              style={{
                backgroundColor: WinlyColors.offWhite,
                elevation: 1,
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 100,
                maxWidth: 160,
                marginBottom: 24,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  textAlign: "center",
                  fontWeight: 600,
                  color: WinlyColors.black,
                }}
              >
                Campaign Details
              </Text>
            </View>
          </View>

          {/* CAMPAIGN DETAILS IMAGE AND DESCRIPTION */}

          <View style={{ flexDirection: "row", gap: 12 }}>
            <Image
              source={{ uri: prizeImageUrl }}
              style={{
                flex: 1,
                borderRadius: 8,
                height: 120,
              }}
            />
            <View style={{ flex: 1.2 }}>
              {/* <TextComponent text={"Campaign: " + title} /> */}
              <TextComponent text={title} />
              <TextComponent text={"Closing Date: " + closing_date} />
              <TextComponent text={"Draw Date: " + draw_date} />
              <TextComponent
                text={
                  "Description: Buy " +
                  description?.split("<")[0] +
                  " and get a chance to win " +
                  title
                }
              />
            </View>
          </View>
        </View>

        {/* MANAGE COUNT AND CART BUTTONS */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 12,
            paddingVertical: 18,
            backgroundColor: WinlyColors.white,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            borderTopColor: WinlyColors.offWhite,
            borderTopWidth: 1.5,
          }}
        >
          {/* QUANTITY HANDLER BTN */}
          {status?.status ? (
            <View />
          ) : (
            <View style={{ flexDirection: "row", gap: 4 }}>
              <CustomButtonHandler
                onPress={handleDecreaseProductQty}
                disabledCondition={productQty > 1 ? false : true}
                btnText={"-"}
              />
              <CustomButtonHandler
                onPress={() => {}}
                disabledCondition={true}
                btnText={productQty}
              />
              <CustomButtonHandler
                onPress={handleIncreaseProductQty}
                disabledCondition={false}
                btnText={"+"}
              />
            </View>
          )}

          {/* ADD TO CART, MODAL CLOSE BTN */}
          <View style={{ flexDirection: "row", gap: 4 }}>
            {status?.status ? null : (
              <CustomButtonHandler
                onPress={handleAddToCart}
                disabledCondition={false}
                btnText={"Add Cart"}
                bgColor={WinlyColors.primaryRed}
                textColor={WinlyColors.white}
              />
            )}

            <CustomButtonHandler
              onPress={handleHide}
              disabledCondition={false}
              btnText={"Close"}
            />
          </View>
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};
