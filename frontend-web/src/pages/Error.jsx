import Lottie from "lottie-react";
import LottieNotFound from "../assets/lottieFiles/404.json";
const Error = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Lottie animationData={LottieNotFound} style={{ width: "400px" }} />
      <p style={{ fontSize: "19px" }}>Not Found</p>
    </div>
  );
};

export default Error;
