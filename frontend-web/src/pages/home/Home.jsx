import { Container } from "react-bootstrap";
import style from "./style.module.css";
const { home, homeContent } = style;
const Home = () => {
  return (
    <Container>
      <div className={home} id="home">
        <div className={homeContent}>
          <h1>
            Order your
            <br /> favourite food here
          </h1>
          <p>
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise.Our
            mission is to satisfy your cravings and elevate your dining
            experience,one delicious meal at a time
          </p>
          <button>View Menu</button>
        </div>
      </div>
    </Container>
  );
};

export default Home;
