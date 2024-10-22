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
          {/* Home NavItem */}
          <Box ml={0} flexGrow={1}>
            <NavItem route="/" end>
              Home
            </NavItem>
          </Box>

          {/* Show "Moderate articles" link only if userType is "Moderation" */}
          {user?.userType === "Moderation" && (
            <Box ml={4}>
              <NavItem route="/moderation">Moderate articles</NavItem>
            </Box>
          )}
          {user?.userType === "Moderation" && (
            <Box ml={4}>
              <NavItem route="/articles/deletion">Delete articles</NavItem>
            </Box>
          )}

          {/* Show "Analysis articles" and "Delete articles" if userType is "Analysis" */}
          {user?.userType === "Analysis" && (
            <Box ml={4}>
              <NavItem route="/analysis">Analysis articles</NavItem>
            </Box>
          )}
          {user?.userType === "Analysis" && (
            <Box ml={4}>
              <NavItem route="/articles/deletion">Delete articles</NavItem>
            </Box>
          )}

          {/* Common Articles Dropdown available for all users */}
          <Box ml={4}>
            <NavItem dropdown route="/articles">
              Articles <IoMdArrowDropdown />
              <NavDropdown>
                <NavItem route="/articles">View articles</NavItem>
                <NavItem route="/articles/submission">Submit articles</NavItem>
              </NavDropdown>
            </NavItem>
          </Box>

          {/* If no user is logged in, show Login and Register options */}
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

          {/* Theme Toggle Button */}
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
