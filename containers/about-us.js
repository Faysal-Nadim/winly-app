import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import { BoldView } from "../components/text/bold";
import { RegularView } from "../components/text/regular";
import { MediumView } from "../components/text/medium";

/**
 * @author
 * @function AboutUs
 **/

const aboutUs = [
  {
    section_title: "Eligibility",
    paragraph: [
      "The Winly LLC Campaigns (the Campaign) is open to all who are 18 years of age or older at the time of entry.",
    ],
  },
  {
    section_title: "Campaign Period",
    paragraph: [
      "The Campaign beginning and ending time is mentioned in the Campaign Details Page (the Campaign Period).",
    ],
  },
  {
    section_title: "How to Enter",
    paragraph: [
      "To enter the Campaign, users must use our offical website or the Winly LLC mobile app. No other method of entry will be accepted.",
      "There is no limitation per person",
    ],
  },
  {
    section_title: "Prizes",
    paragraph: [
      "The prize(s) and their respective values will be specified within the Campaign description or on the Winly LLC mobile app.",
    ],
  },
  {
    section_title: "Winner Selection",
    paragraph: [
      "The winner(s) will be selected at random from all eligible entries received during the Campaign Period. The odds of winning depend on the number of eligible entries received.",
    ],
  },
  {
    section_title: "Winner Notification",
    paragraph: [
      "The winner(s) will be notified through the Winly LLC app, via email, or other contact information provided at the time of entry. If a potential winner does not respond to the notification within [number] days, an alternate winner may be selected.",
    ],
  },
  {
    section_title: "General Conditions",
    paragraph: [
      "1. By participating in this Campaign, entrants agree to abide by these Official Rules and the decisions of Winly LLC, which are final and binding.",
      "2. This Campaign is in no way sponsored, endorsed, or administered by, or associated with Apple Inc. Any questions, comments, or complaints regarding the Campaign should be directed to Winly LLC and not to Apple Inc.",
      "3. Winly LLC reserves the right to modify or cancel the Campaign at any time and for any reason.",
    ],
  },
  {
    section_title: "Publicity",
    paragraph: [
      "By participating in the Campaign, you grant Winly LLC the right to use your name, likeness, and submission for promotional and advertising purposes without additional compensation.",
    ],
  },
];

export const AboutUs = (props) => {
  const { container } = styles;
  return (
    <SafeAreaView style={container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <View>
            <Image
              resizeMode="contain"
              source={require("../assets/winly-big.png")}
              style={{
                height: 100,
                width: 160,
              }}
            />
          </View>
          <View>
            <MediumView>
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                Winly Monthly Draw - Win Great Prizes
              </Text>
            </MediumView>
          </View>
        </View>
        {aboutUs.map((section, i) => (
          <View key={i}>
            <View style={{ marginBottom: 15 }}>
              <BoldView>
                <Text style={{ fontSize: 25, flex: 1, textAlign: "justify" }}>
                  {section.section_title}
                </Text>
              </BoldView>
            </View>
            {section.paragraph.map((para, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <RegularView>
                  <Text style={{ fontSize: 16, flex: 1, textAlign: "justify" }}>
                    {para}
                  </Text>
                </RegularView>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    marginBottom: 60,
    marginLeft: 10,
    marginRight: 10,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
