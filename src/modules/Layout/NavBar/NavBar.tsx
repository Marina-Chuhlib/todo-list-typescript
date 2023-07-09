import { AppBar, Container, Toolbar } from "@mui/material";


import { Link,Icon } from "./navBar.styled";

const NavBar: React.FC = () => {
  return (
    <>
      <AppBar
        position="static"
        component="header"
        sx={{
          background: "#a3b899",
          top: 0,
          zIndex: "1",
          marginBottom: "20px",
          paddingLeft: "30px",
          paddingRight: "50px",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters component="nav">
            <Link to="/" style={{ marginRight: "auto" }}>
              <Icon fontSize="medium" />
              Home
            </Link>
            <Link to="/todos">List</Link>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;
