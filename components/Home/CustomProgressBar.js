import { View, Text, StyleSheet } from "react-native";
import WinlyColors from "../../assets/WinlyColors";
import { Rect, Svg } from "react-native-svg";
import { RegularView } from "../text/regular";

const CustomProgressBar = ({ sold, stock, status }) => {
  // sold = 100;
  // stock = 100;
  // Calculate the progress percentage
  const progress = (sold / stock) * 100;

  // Calculate the dashArray and dashOffset values for the SVG rectangle
  let percentage = sold / stock;
  let dashArray = (140 + 54) * 2;

  if (percentage > 0.88 && percentage !== 1) {
    percentage = 0.88;
  }

  let dashOffset = dashArray - dashArray * percentage;

  let maxWidth = 140;

  return (
    <View
      style={{
        // position: "relative",
        width: maxWidth,
      }}
    >
      <View style={{ marginTop: 0 }}>
        <Svg
          width={maxWidth}
          height={69}
          viewBox="-6 6 150 54"
          fill={WinlyColors.white}
        >
          <Rect
            width={139}
            height={63}
            rx={30}
            strokeWidth={4} // Adjust the stroke width as needed
            strokeDasharray={392}
            strokeDashoffset={0}
            stroke={WinlyColors.offWhite} // Adjust the border color as needed
          />
        </Svg>
      </View>
      <View style={{ marginTop: -69 }}>
        <Svg
          width={maxWidth}
          height={69}
          viewBox="-6 6 150 54"
          // fill={WinlyColors.white}
          fill="none"
        >
          <Rect
            width={139}
            height={63}
            rx={30}
            strokeWidth={4} // Adjust the stroke width as needed
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            stroke={WinlyColors.primaryRed} // Adjust the border color as needed
          />
        </Svg>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 4,
          paddingHorizontal: 28,
          backgroundColor: "transparent",
          marginTop: -58,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <RegularView>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 800,
              }}
            >
              {sold}
            </Text>
          </RegularView>
          <RegularView>
            <Text
              style={{
                fontSize: 7,
              }}
            >
              SOLD
            </Text>
          </RegularView>
        </View>

        <View
          style={{
            width: 1,
            height: 40,
            backgroundColor: WinlyColors.offWhite,
          }}
        />

        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <RegularView>
            <Text
              style={{
                fontSize: 7,
              }}
            >
              OUT OF
            </Text>
          </RegularView>
          <RegularView>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 800,
              }}
            >
              {status == true ? 0 : stock}
            </Text>
          </RegularView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rect: {
    fill: "none",
    strokeWidth: 8,
    stroke: WinlyColors.offWhite,
    position: "absolute",
    top: 0,
    left: -2,
  },
});

export default CustomProgressBar;
