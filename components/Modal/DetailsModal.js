import React, { useState } from "react";
// import { ScrollView } from "react-native-virtualized-view";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import WinlyColors from "../../assets/WinlyColors";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions";
import { useNavigation } from "@react-navigation/native";
import { RegularView } from "../text/regular";

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
      disabled={disabledCondition ? disabledCondition : false}
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

export const DetailsModal = ({ detailsData, setModalVisible }) => {
  // QUANTITY HANDELERS

  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const navigation = useNavigation();

  const [productQty, setProductQty] = useState(1);
  const handleIncreaseProductQty = () => {
    setProductQty((current) => current + 1);
  };
  const handleDecreaseProductQty = () => {
    if (productQty != 0) setProductQty((current) => current - 1);
  };

  // CART HANDLERS

  const handleAddToCart = () => {
    dispatch(addToCart(detailsData, productQty));
    setModalVisible(false);
  };

  let prizeImageUrl = detailsData?.img?.prize;
  let title = detailsData?.title;
  let productTitle = detailsData?.productTitle;
  let productImageUrl = detailsData?.img?.product;

  let price = detailsData?.price;
  let draw_date = detailsData?.drawDate;
  let description = detailsData?.prizeDiscription;
  let status = detailsData?.displayStatus?.find((x) => x?.status == "Upcoming");
  let closing_date =
    detailsData?.validity != 0 || detailsData?.validity != null
      ? new Date(detailsData?.validity || 0).toLocaleDateString("en-us", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "To be announced";

  const screenWidth = Dimensions.get("window").width;

  return (
    <SafeAreaView style={{ width: screenWidth, maxWidth: 420 }}>
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
            {productTitle} {title}
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
              <TextComponent
                text={
                  detailsData?.displayStatus[0].status === "Upcoming" ||
                  detailsData.displayStatus[0].status === "Selling Fast"
                    ? "Closing Date: TBA"
                    : `Closing Date: ${closing_date}`
                }
              />
              <TextComponent
                text={
                  detailsData?.displayStatus[0].status === "Upcoming" ||
                  detailsData.displayStatus[0].status === "Selling Fast"
                    ? "Draw Date: TBA"
                    : `Draw Date: ${detailsData.drawDate}`
                }
              />
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
          <View>
            <RegularView style={{ fontSize: 10 }}>
              {"\n"}
              <Text style={{ color: "red", fontSize: 15 }}>
                Important Notes:
              </Text>{" "}
              {"\n"}- This Campaign is in no way sponsored, endorsed, or
              administered by, or associated with Apple Inc. Any questions,
              comments, or complaints regarding the Campaign should be directed
              to Winly LLC and not to Apple Inc.{"\n"} -You must be of legal age
              and in compliance with local regulations to participate in our
              prize draws. {"\n"}
              -Each draw is limited by time and quantity. {"\n"}-All entries and
              payments are final. We do not offer refunds for entries once
              they've been processed.
            </RegularView>
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
              <>
                <CustomButtonHandler
                  onPress={
                    auth?.authenticate
                      ? handleAddToCart
                      : () => navigation.navigate("Login")
                  }
                  disabledCondition={false}
                  btnText={auth?.authenticate ? "Add Cart" : "Login to Buy"}
                  bgColor={WinlyColors.primaryRed}
                  textColor={WinlyColors.white}
                />
              </>
            )}

            <CustomButtonHandler
              onPress={() => setModalVisible(false)}
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
