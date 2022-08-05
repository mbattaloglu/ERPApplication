import React, { useEffect } from "react";
import { View } from "react-native";
import MainMenu from "./src/pages/MainMenu";


const App = () => {
  

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;