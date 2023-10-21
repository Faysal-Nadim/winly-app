<View style={{}}>
  <View
    style={{
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    }}
  >
    <View>
      <Text
        style={{
          fontFamily: loaded ? "Sora-Medium" : null,
          marginLeft: 5,
        }}
      >
        First Name
      </Text>
      <TextInput
        value={firstName.toUpperCase()}
        onChangeText={setFirstName}
        style={{
          fontFamily: loaded ? "Sora" : null,
          fontSize: 15,
          height: 50,
          width: Width / 2.3,
          borderRadius: 10,
          margin: 5,
          padding: 10,
          backgroundColor: "#fff",
        }}
      />
    </View>
    <View>
      <Text
        style={{
          fontFamily: loaded ? "Sora-Medium" : null,
          marginLeft: 5,
        }}
      >
        Last Name
      </Text>
      <TextInput
        value={lastName.toUpperCase()}
        onChangeText={setLastName}
        style={{
          fontFamily: loaded ? "Sora" : null,
          fontSize: 15,
          height: 50,
          width: Width / 2.3,
          borderRadius: 10,
          margin: 5,
          padding: 10,
          backgroundColor: "#fff",
        }}
      />
    </View>
  </View>
  <View
    style={{
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginTop: 5,
    }}
  >
    <View>
      <Text
        style={{
          fontFamily: loaded ? "Sora-Medium" : null,
          marginLeft: 5,
        }}
      >
        Email
      </Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        aria-label="Email"
        style={{
          fontFamily: loaded ? "Sora" : null,
          fontSize: 15,
          height: 50,
          width: Width - 35,
          borderRadius: 10,
          margin: 5,
          padding: 10,
          backgroundColor: "#fff",
        }}
      />
    </View>
  </View>
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      marginTop: 5,
      justifyContent: "space-between",
    }}
  >
    <View>
      <Text
        style={{
          fontFamily: loaded ? "Sora-Medium" : null,
          marginLeft: 5,
          fontWeight: 500,
        }}
      >
        Dial Code
      </Text>
      <View
        style={{
          // height: 150,
          width: Width / 2.3,
          backgroundColor: "#fff",
          justifyContent: "center",
          margin: 5,
          borderRadius: 10,
        }}
      >
        <SelectList
          setSelected={(val) => handleDialCode(val)}
          data={data}
          save="value"
          label="DialCode"
          defaultOption={defaultDialCode}
          fontFamily="Sora"
        />
      </View>
    </View>
    <View>
      <Text
        style={{
          fontFamily: loaded ? "Sora-Medium" : null,
          marginLeft: 5,
          fontWeight: 500,
        }}
      >
        Phone Number
      </Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        style={{
          fontFamily: loaded ? "Sora" : null,
          fontSize: 15,
          height: 50,
          width: Width / 2.3,
          borderRadius: 10,
          margin: 5,
          padding: 10,
          backgroundColor: "#fff",
        }}
      />
    </View>
  </View>
  <View
    style={{
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginTop: 5,
    }}
  >
    <View>
      <Text
        style={{
          fontFamily: loaded ? "Sora-Medium" : null,
          marginLeft: 5,
        }}
      >
        Date of Birth
      </Text>
      <TextInput
        value={dob}
        onChangeText={setDob}
        style={{
          fontFamily: loaded ? "Sora" : null,
          fontSize: 15,
          height: 50,
          width: Width / 2.3,
          borderRadius: 10,
          margin: 5,
          padding: 10,
          backgroundColor: "#fff",
        }}
      />
    </View>
    <View>
      <Text
        style={{
          fontFamily: loaded ? "Sora-Medium" : null,
          marginLeft: 5,
        }}
      >
        Gender
      </Text>
      <View
        style={{
          height: 50,
          width: Width / 2.3,
          backgroundColor: "#fff",
          justifyContent: "center",
          margin: 5,
          borderRadius: 10,
          padding: 10,
        }}
      >
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Others" value="Others" />
        </Picker>
      </View>
    </View>
  </View>
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      marginTop: 5,
      justifyContent: "space-between",
    }}
  >
    <View>
      <Text
        style={{
          fontFamily: loaded ? "Sora-Medium" : null,
          marginLeft: 5,
          fontWeight: 500,
        }}
      >
        Country
      </Text>
      <View
        style={{
          // height: 50,
          width: Width / 2.3,
          backgroundColor: "#fff",
          justifyContent: "center",
          margin: 5,
          borderRadius: 10,
        }}
      >
        <SelectList
          setSelected={(val) => setCountry(val)}
          data={countryData}
          save="value"
          label="Country"
          defaultOption={countryData.filter((i) => i.value === country)[0]}
          fontFamily="Sora"
        />
      </View>
    </View>
    <View>
      <Text
        style={{
          fontFamily: loaded ? "Sora-Medium" : null,
          marginLeft: 5,
          fontWeight: 500,
        }}
      >
        Nationality
      </Text>
      <View
        style={{
          // height: 50,
          width: Width / 2.3,
          backgroundColor: "#fff",
          justifyContent: "center",
          margin: 5,
          borderRadius: 10,
        }}
      >
        <SelectList
          setSelected={(val) => setNationality(val)}
          data={countryData}
          save="value"
          label="Nationality"
          defaultOption={countryData.filter((i) => i.value === nationality)[0]}
          fontFamily="Sora"
        />
      </View>
    </View>
  </View>
</View>;
