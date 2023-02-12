import React from "react";

import { Refine } from "@pankod/refine-core";
import {
  AuthPage,
  notificationProvider,
  Layout,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-antd";
import "@pankod/refine-antd/dist/reset.css";

import { dataProvider, liveProvider } from "@pankod/refine-appwrite";
import routerProvider from "@pankod/refine-react-router-v6";
import { appwriteClient } from "utility";
import { ColorModeContextProvider } from "contexts";
import { authProvider } from "./authProvider";

function App() {
  return (
    <ColorModeContextProvider>
      <Refine
        dataProvider={dataProvider(appwriteClient, {
          databaseId: "default",
        })}
        liveProvider={liveProvider(appwriteClient, {
          databaseId: "default",
        })}
        liveMode="auto"
        authProvider={authProvider}
        LoginPage={AuthPage}
        notificationProvider={notificationProvider}
        Layout={Layout}
        ReadyPage={ReadyPage}
        catchAll={<ErrorComponent />}
        routerProvider={routerProvider}
      />
    </ColorModeContextProvider>
  );
}

export default App;
