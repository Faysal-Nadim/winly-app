import React from "react";
import { View, Text, StyleSheet, StatusBar, Dimensions } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import WinlyColors from "../assets/WinlyColors";

/**
 * @author
 * @function FAQ
 **/

const faqs = [
  {
    section_title: "About Us",
    qna_array: [
      {
        qus: "What is Winly?",
        ans: "Winly is an innovative online store that offers a unique shopping experience. With every purchase, Winly provides customers a complimentary Prize Draw ticket, presenting an opportunity to win luxurious prizes.",
      },
      {
        qus: "How can I access Winly.net?",
        ans: "Winly is accessible through various devices, including desktop computers, smartphones, and tablets.",
      },
      {
        qus: "In which countries does Winly operate?",
        ans: "Winly operates worldwide, providing accessibility to customers globally. For comprehensive information on product/prize collection for international users, please refer to our 'Draw Terms & Conditions'.",
      },
    ],
  },
  {
    section_title: "Campaigns",
    qna_array: [
      {
        qus: "How often do new Winly campaigns appear?",
        ans: "New campaigns are launched immediately after the completion of an existing campaign. While there is no specific time limit per campaign, you can anticipate frequent releases of new campaigns on Winly.",
      },
      {
        qus: "Will the range of products and prize categories expand?",
        ans: "We have exciting plans to introduce new products and prizes. Stay tuned for upcoming campaigns that will bring more variety and excitement to Winly.",
      },
    ],
  },
  {
    section_title: "Making a Purchase",
    qna_array: [
      {
        qus: "Are there any undisclosed fees that I should be aware of when making a purchase?",
        ans: "Rest assured, there are no hidden charges on any Winly purchase. However, we recommend checking with your bank to inquire about any potential transaction or processing fees they may apply.",
      },
      {
        qus: "Which currencies are accepted for purchasing a Winly product?",
        ans: "Currently, Winly accepts Dirhams. You can make a purchase from Winly using any bank account with any currency. However, please note that Winly will not be responsible for any exchange rate differences or fees (whether hidden or otherwise) imposed by your bank that may affect the final billing amount.",
      },
      {
        qus: "Is it possible to cancel or refund a purchase order on Winly?",
        ans: "According to the 'User Agreement', all sales purchases on Winly are considered final, and no refunds will be provided under any circumstances.",
      },
    ],
  },
  {
    section_title: "Winly Prizes",
    qna_array: [
      {
        qus: "Where can I collect my Winly prize?",
        ans: "Instructions on prize collection will be sent to you (as the 'winner') via email. For complete details, please consult the 'Draw Terms & Conditions'.",
      },
      {
        qus: "Can I designate someone else to collect my Prize?",
        ans: "Only the registered account holder or, at our discretion, an individual with 'Power of Attorney' (POA) can collect the Prize on behalf of the registered account holder. Emirates ID or passport are the only acceptable forms of identification (please ensure your identification is up to date).",
      },
      {
        qus: "What if I prefer to keep my win in the Winly prize draw confidential?",
        ans: "According to the 'Draw Terms & Conditions', Winly reserves the right to utilize your image, name, and any statements you have made across their marketing channels (both physical and digital).",
      },
      {
        qus: "Can I access information about previous winners of the Winly campaign draws?",
        ans: "You will have the opportunity to view past winners of Winly campaigns through our social media channels.",
      },
      {
        qus: "How will I receive updates on the campaign status: 'Coming Soon'/'Launched'/'Ending'/'Closed'?",
        ans: "Winly will send 'Push Notifications' and emails to inform all ticket holders about the status of each campaign.",
      },
    ],
  },
];

export const FAQ = (props) => {
  const screenWidth = Dimensions.get("window").width;
  return (
    <View
      style={{
        width: screenWidth,
      }}
    >
      <ScrollView style={{ paddingHorizontal: 16, paddingVertical: 0 }}>
        {faqs.map((section, index) => (
          <View key={index} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{section?.section_title}</Text>
            <View style={{ marginTop: 2 }}>
              {section.qna_array.map((qa, i) => (
                <View key={i}>
                  <Text style={styles.question}>
                    {i + 1}. {qa?.qus}
                  </Text>
                  <Text style={styles.answer}>Answer: {qa?.ans}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 28,
    marginBottom: 0,
    fontWeight: "bold",
    color: WinlyColors.black,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    color: WinlyColors.offBlack,
  },
  answer: {
    fontSize: 18,
    marginTop: 4,
  },
  sectionContainer: {
    marginTop: 18,
    marginBottom: 20,
  },
});
