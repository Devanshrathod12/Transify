import React, { useState } from "react";
import AppNavigator from "./src/Component/AppNavigator";

const App = () => {
  const [language, setLanguage] = useState("en");

  return (
    <AppNavigator
      language={language}
      setLanguage={setLanguage}
    />
  );
};

export default App;