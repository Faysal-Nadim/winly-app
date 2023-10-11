// import React, { useState } from "react";
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import WinlyColors from "../../assets/WinlyColors";
import { RegularView } from "../text/regular";

/**
 * @author
 * @function SliderComponent
 **/
export const SliderComponent = ({ item, index }) => {
  const screenWidth = Dimensions.get("window").width;

  let contentBoxWidth = screenWidth - 32;
  let imageUrl = item?.img?.prize;
  let title = item?.title;
  let productTitle = item?.productTitle;
  let productImageUrl = item?.img?.product;

  // const [isModalVisible, setModalVisible] = useState(false);

  // const toggleModal = () => {
  //   setModalVisible(!isModalVisible);
  // };

  return (
    <View style={{ width: screenWidth, padding: 8 }}>
      {/* <View style={{ flex: 1 }}>
        <Button title="Show modal" onPress={toggleModal} />

        <Modal isVisible={isModalVisible}>
          <View style={{ flex: 1 }}>
            <Text>Hello!</Text>

            <Button title="Hide modal" onPress={toggleModal} />
          </View>
        </Modal>
      </View> */}
      <Image
        source={{ uri: imageUrl }}
        style={{ height: 400, width: "100%", borderRadius: 12 }}
      />

      <View
        style={{
          height: 215,
          width: contentBoxWidth,
          padding: 16,
          marginHorizontal: 8,

          marginTop: -225,
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          borderRadius: 12,
        }}
      >
        <RegularView>
          <Text style={{ fontSize: 26, fontWeight: 800 }}>Win</Text>
        </RegularView>
        <RegularView>
          <Text style={{ fontSize: 20, fontWeight: 800 }}>{title}</Text>
        </RegularView>
        <RegularView>
          <Text style={{ fontSize: 12, fontWeight: 600 }}>{productTitle}</Text>
        </RegularView>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          {/* <Button
            title="Prize Details"
            color={WinlyColors.primaryRed}
            style={{ height: 48, width: 108, borderRadius: 8 }}
            onPress={() => {
              // Handle button press here
            }} 
          />*/}
          <TouchableOpacity onPress={() => {}}>
            <View
              style={{
                backgroundColor: WinlyColors.primaryRed,
                paddingVertical: 10,
                paddingHorizontal: 16,
                borderRadius: 8,
              }}
            >
              <RegularView>
                <Text style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>
                  Prize Details
                </Text>
              </RegularView>
            </View>
          </TouchableOpacity>
          <Image
            source={{ uri: productImageUrl }}
            style={{
              height: 95,
              width: 90,
              borderRadius: 8,
              borderColor: "#000000",
              borderWidth: 2,
            }}
          />
        </View>
      </View>
    </View>
  );
};
