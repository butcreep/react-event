// import React, { useContext } from "react";
// import { message, Button } from "antd";
// import { ThemeContext } from "./contexts/ThemeContext";

// const useCustomMessage = () => {
//   const theme = useContext(ThemeContext);

//   const showMessage = msg => {
//     message.config({
//       top: theme.topSpacing || 100,
//       duration: 2,
//       maxCount: 3,
//     });
//     message.success(msg);
//   };

//   return showMessage;
// };

// const MyComponent = () => {
//   const showMessage = useCustomMessage();

//   return <Button onClick={() => showMessage("This is a success message!")}>Show Message</Button>;
// };

// export default MyComponent;
import { message } from "antd";

const useCustomMessage = () => {
  const showMessage = (type, msg) => {
    message[type](msg, 2); // type은 'success', 'error' 등이 될 수 있습니다.
  };

  return showMessage;
};

export default useCustomMessage;
