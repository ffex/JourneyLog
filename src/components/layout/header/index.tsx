import { useContext } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import {
  AntdLayout,
  Space,
  Avatar,
  Typography,
  Switch,
} from "@pankod/refine-antd";
import { ColorModeContext } from "contexts/color-mode";
import { Title } from "../title";

const { Text } = Typography;

export const Header: React.FC = () => {
  const { data: user } = useGetIdentity();
  const { mode, setMode } = useContext(ColorModeContext);
  
  return (
    <AntdLayout.Header
     
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0px 24px",
        height: "64px",
        backgroundColor:"#FFFFFF"
      }}
    >
      <Space style={{ marginLeft: "8px" }}>

        {user?.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
      </Space>
    </AntdLayout.Header>
  );
};
