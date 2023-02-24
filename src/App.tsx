import React, { useContext } from "react";

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
import { ColorModeContext, ColorModeContextProvider } from "contexts/color-mode";
import { authProvider } from "./authProvider";
import { AntdInferencer } from "@pankod/refine-inferencer/antd";
import { JourneyCreate } from "pages/journey/create";
import { StopsCreate } from "pages/stops/create";
import { Header } from "components/layout/header";
import { JourneyModeContext, JourneyModeContextProvider } from "contexts/journey";
import { DashboardPage } from "pages/dashboard";
import { Typography } from 'antd';
import { JourneysList } from "pages/journey/list";
import { BookOutlined, BranchesOutlined, CarOutlined, EnvironmentOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { StopsList } from "pages/stops/list";
import { RoutesList } from "pages/routes/list";
import { JourneyEdit } from "pages/journey/edit";
import { StopEdit } from "pages/stops/edit";
import { Title } from "components/layout/title";
import { TodosList } from "pages/Todo/list";
import { TodoCreate } from "pages/Todo/create";

function App() {

  return (
    
    <JourneyModeContextProvider>
      <ColorModeContextProvider>
        <Refine
          dataProvider={dataProvider(appwriteClient, {
            databaseId: "63e92cf19e4d52e3df99",
          })}
          liveProvider={liveProvider(appwriteClient, {
            databaseId: "63e92cf19e4d52e3df99",
          })}
          liveMode="auto"
          authProvider={authProvider}
          LoginPage={AuthPage}
          notificationProvider={notificationProvider}
          Title={Title}
          Header={Header}
          Layout={Layout}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          routerProvider={routerProvider}
          DashboardPage={DashboardPage}
          resources={[
            {
              name: "63ea42a11ee566d4a63d",
              icon: <BookOutlined/>,
              create: JourneyCreate,
              edit: JourneyEdit,
              list: JourneysList,
              options: {
                label: "Journey"
              }
            },
            {
              name: "63eb883cc7b7c2658eaa",
              icon: <EnvironmentOutlined/>,
              create: StopsCreate,
              edit:StopEdit,
              list: StopsList,
              options: {
                label: "Stops"
              }
            },
            {
              name: "63f249460746d8c64727",
              icon: <BranchesOutlined/>,
              list: RoutesList,
              options: {
                label: "Routes"
              }
            },
            {
              name: "63ea440ead9b13a8a998",
              
              icon: <CarOutlined/>,
              list: AntdInferencer,
              show: AntdInferencer,
              create: AntdInferencer,
              edit: AntdInferencer,
              options: {
                hide:true,
                label: "Vehicle Type"
              }
            },
            {
              name: "63f851448cf815bc4833",
              
              icon: <UnorderedListOutlined/>,
              list: TodosList,
              create: TodoCreate,
              options: {
                label: "ToDo"
              }
            },
            /*           {
                        name: "63e92d4c70a7266a81ae",
                        list:AntdInferencer,
                        show:AntdInferencer,
                        create:AntdInferencer,
                        edit:AntdInferencer,
                        options:{
                          label:"POI Category"
                        }
                      } */

          ]}
        />
      </ColorModeContextProvider>
    </JourneyModeContextProvider>
  );
}

export default App;
