import React, { useRef, useState } from "react";
import { View, Text, Dimensions, FlatList } from "react-native";
import WinlyColors from "../../assets/WinlyColors";
import { ExploreCampaignCard } from "./ExploreCampaignCard";
import { RegularView } from "../text/regular";

/**
 * @author
 * @function ExploreCampaigns
 **/

let fullText =
  "Winly is a cutting-edge online store that provides customers with a one-of-a-kind shopping experience. What sets Winly apart is its remarkable offering: with each purchase, customers receive a complimentary Prize Draw ticket, granting them the chance to win extravagant prizes. This unique feature adds an exciting element to the shopping journey, making Winly a captivating destination for those seeking not only quality products but also the possibility of winning luxurious rewards. All draws are regulated by the Dubai Economy & Tourism..";
let shortText =
  "Winly is a cutting-edge online store that provides customers with a one-of-a-kind shopping experience..";

export const ExploreCampaigns = ({ data }) => {
  const flatlistRef = useRef();
  const screenWidth = Dimensions.get("window").width;
  const [toggle, setToggle] = useState(false);

  const handleToggleText = () => {
    setToggle((current) => !current);
  };
  return (
    <View style={{ width: screenWidth }}>
      <View
        style={{
          marginBottom: 24,
          paddingHorizontal: 14,
        }}
      >
        <RegularView>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            Explore Campaigns
          </Text>
        </RegularView>

        <RegularView>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 400,
            }}
          >
            {toggle ? fullText : shortText}

            <Text
              onPress={handleToggleText}
              style={{
                color: WinlyColors.primaryRed,
              }}
            >
              {toggle ? " See less" : " See more"}
            </Text>
          </Text>
        </RegularView>
      </View>

      <FlatList
        data={data}
        ref={flatlistRef}
        renderItem={ExploreCampaignCard}
        keyExtractor={(item) => item._id}
        horizontal={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
