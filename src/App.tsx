import RoutesWrapper from './routes';
import { App as AntdApp } from 'antd';
// import AntdConfig from "./theme/antd";
// import { MotionLazy } from "./components/animate/motion-lazy";

function App() {
  return (
    // <AntdConfig>
    <AntdApp>
      {/* <MotionLazy> */}
      <RoutesWrapper />
      {/* </MotionLazy> */}
    </AntdApp>
    // </AntdConfig>
  );
}
export default App;
