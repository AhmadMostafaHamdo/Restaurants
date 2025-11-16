
import style from "./style.module.css";
const { loadingParent, loadingChild } = style;
const Loading = ({ state, children }) => {
  if (state) {
    return (
      <div className={loadingParent}>
        <div className={loadingChild}></div>
      </div>
    );
  } else {
    return children;
  }
};

export default Loading;
