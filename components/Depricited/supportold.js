import React from "react";

const supportold = () => {
  return (
    <>
      <View>
        <Text
          style={{
            fontFamily: loaded ? "Sora-Medium" : null,
            marginLeft: 5,
            fontSize: 16,
          }}
        >
          Full Name
        </Text>
        <TextInput
          aria-disabled
          placeholder="Enter Your Full Name"
          value={name}
          onChangeText={setName}
          aria-label="Full Name"
          style={{
            fontFamily: loaded ? "Sora" : null,
            fontSize: 15,
            height: 50,
            borderRadius: 10,
            margin: 5,
            padding: 10,
            backgroundColor: "#fff",
            borderColor: "#828282",
            borderWidth: 1,
          }}
        />
      </View>
      <View>
        <Text
          style={{
            fontFamily: loaded ? "Sora-Medium" : null,
            marginLeft: 5,
            fontSize: 16,
          }}
        >
          Email
        </Text>
        <TextInput
          placeholder="Enter Your Email"
          value={email}
          onChangeText={setEmail}
          aria-label="Email"
          style={{
            fontFamily: loaded ? "Sora" : null,
            fontSize: 15,
            height: 50,
            borderRadius: 10,
            margin: 5,
            padding: 10,
            backgroundColor: "#fff",
            borderColor: "#828282",
            borderWidth: 1,
          }}
          keyboardType="email-address"
        />
      </View>
      <Text
        style={{
          fontFamily: loaded ? "Sora-Medium" : null,
          marginLeft: 5,
          fontSize: 16,
        }}
      >
        Topic
      </Text>
      <View
        style={{
          height: 50,
          // width: Width / 2.3,
          backgroundColor: "#fff",
          justifyContent: "center",
          margin: 5,
          borderRadius: 10,
          padding: 10,
          borderColor: "#828282",
          borderWidth: 1,
        }}
      >
        <Picker
          selectedValue={topic}
          onValueChange={(itemValue, itemIndex) => setTopic(itemValue)}
          style={{}}
        >
          <Picker.Item label="General Enquiries" value="General" />
          <Picker.Item label="Technical Issues" value="Technical" />
          <Picker.Item label="Payment Issues" value="Payment" />
        </Picker>
      </View>
      <View>
        <Text
          style={{
            fontFamily: loaded ? "Sora-Medium" : null,
            marginLeft: 5,
            fontSize: 16,
          }}
        >
          Message
        </Text>
        <TextInput
          placeholder="Enter Your Message"
          value={msg}
          onChangeText={setMsg}
          aria-label="Address"
          style={{
            fontFamily: loaded ? "Sora" : null,
            fontSize: 15,
            height: 120,
            // width: Width - 35,
            borderRadius: 10,
            margin: 5,
            padding: 10,
            backgroundColor: "#fff",
            borderColor: "#828282",
            borderWidth: 1,
          }}
          multiline={true}
          // keyboardType="email-address"
        />
      </View>
    </>
  );
};

export default supportold;
