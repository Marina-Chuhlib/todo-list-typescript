import { Wrapper, Title, Img, TodoLink } from "./home.styled";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import canvas from "./img.jpg";

const Home: React.FC = () => {
  return (
    <Wrapper>
      <Title>Home Page</Title>
      <Img src={canvas} alt="canvas" width="900px" height="400px" />
      <TodoLink to="/todos">
        Go to to-do list
        <ContentPasteGoIcon sx={{ color: "#376e45" }} />
      </TodoLink>
    </Wrapper>
  );
};

export default Home;
