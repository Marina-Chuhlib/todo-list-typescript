import {
  Wrapper,
  Title,

  Text,
  ImgWrapper,
  Img,
  TodoLink,
} from "./home.styled";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import canvas from "./img.jpg";

const Home: React.FC = () => {
  return (
    <Wrapper>
      <Title> Task Management Tool for Creators</Title>

      <Text>
        A convenient tool for effective task management. The site allows you to
        add, mark as done, and delete tasks, as well as use filters for quickly
        viewing tasks by their status. Stay organized and focused on your
        creative work.
      </Text>

      <ImgWrapper>
        <Img src={canvas} alt="canvas" width="900px" height="400px" />
      </ImgWrapper>
      <TodoLink to="/todos">
        Go to Task List
        <ContentPasteGoIcon sx={{ color: "#376e45" }} />
      </TodoLink>
    </Wrapper>
  );
};

export default Home;
