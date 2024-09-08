import "./styles.css";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Loader = () => {
  return (
    <div className="flex h-screen flex-column items-center justify-center">
      <Spin
        indicator={
          <LoadingOutlined style={{ fontSize: 48, color: "black" }} spin />
        }
      />

      <div
        className="flex justify-center items-center"
        style={{
          position: "absolute",
          bottom: 40,
          width: "200px",
          height: "40px",
        }}
      >
        <h4>
          <strong>Kendra LMS</strong>
        </h4>
      </div>
    </div>
  );
};

export default Loader;
