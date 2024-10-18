import { IoMdArrowDropdown } from "react-icons/io";
import { AppBar, Toolbar, Box, Container, Button } from "@mui/material";
import NavDropdown from "../nav/NavDropDown";
import NavItem from "../nav/NavItem";
import { FC, useContext } from "react";
import { AuthContext } from "../Auth/AuthContext"; // Import AuthContext

interface PopulatedNavBarProps {
  toggleColorMode: () => void;
}

const PopulatedNavBar: FC<PopulatedNavBarProps> = ({ toggleColorMode }) => {
  const { user, logout } = useContext(AuthContext); // Access user and logout from AuthContext

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box ml={0} flexGrow={1}>
            <NavItem route="/" end>
              Home
            </NavItem>
          </Box>
          <Box ml={4}>
            <NavItem dropdown route="/articles">
              Articles <IoMdArrowDropdown />
              <NavDropdown>
                <NavItem route="/articles">View articles</NavItem>
                <NavItem route="/articles/submission">Submit articles</NavItem>
                <NavItem route="/articles/deletion">Delete articles</NavItem>
                <NavItem route="/moderation">Moderate articles</NavItem>
                <NavItem route="/analysis">Analysis articles</NavItem>
              </NavDropdown>
            </NavItem>
          </Box>
          {!user ? (
            <>
              <Box ml={4}>
                <NavItem route="/login/login">Login</NavItem>
              </Box>
              <Box ml={4}>
                <NavItem route="/login/registrationPage">Register</NavItem>
              </Box>
            </>
          ) : (
            <>
              <Box ml={4}>
                <Button onClick={logout} color="inherit">
                  Logout ({user.email})
                </Button>
              </Box>
            </>
          )}
          <Box ml={4}>
            <Button
              onClick={toggleColorMode}
              variant="contained"
              style={{ backgroundColor: "primary.main", color: "white" }}
            >
              Toggle Theme
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default PopulatedNavBar;
