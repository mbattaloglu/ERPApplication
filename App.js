import React, { useEffect } from "react";
import { View } from "react-native";
import MainMenu from "./src/pages/MainMenu";
import { User } from "./src/components/Constants";
import ExtranctBox from "./src/components/Box/ExtractBox";
import InstructionsBox from "./src/components/Box/InstructionsBox";

const App = () => {
  /*useEffect(() => {
    fetch('http://193.53.103.178:5312/api/Authentication', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'osmanportal',
        password: '123',
        // expiresInMins: 60, // optional
      })
    })
      .then(res => res.json())
      .then(res => User.token = res)
      .then(console.log(User.token))
      .catch((e) => alert(e))
  }, [])*/

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <InstructionsBox />
    </View>
  )
}

export default App;