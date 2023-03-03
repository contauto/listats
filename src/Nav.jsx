import { React } from "react";
import { Navbar, Button, Link, Text, useTheme } from "@nextui-org/react";
import { AUTHORIZE } from "./Constants";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "./redux/Actions";

export default function Nav() {
  const activeColor = "primary";

  const { isDark } = useTheme();
  const requestAuthorization = () => {
    window.location.href = AUTHORIZE();
  };

  const { isLoggedIn, display_name, image } = useSelector((store) => ({
    display_name: store.display_name,
    image: store.image,
    isLoggedIn: store.isLoggedIn,
  }));

  const dispatch = useDispatch();

  const onLogOutSuccess = () => {
    dispatch(logoutSuccess());
  };

  return (
    <Navbar isBordered={isDark} variant="sticky">
      <Navbar.Brand>
        <Text b color="inherit">
          LISTATS
        </Text>
      </Navbar.Brand>
      <Navbar.Content>
        {!isLoggedIn && (
          <Navbar.Item>
            <Button
              onPress={requestAuthorization}
              auto
              flat
              as={Link}
              color={activeColor}
            >
              Login With Spotify
            </Button>
          </Navbar.Item>
        )}
        {isLoggedIn && (
          <Navbar.Item>
            <div className="d-flex mt-1">
              <img
                height={60}
                src={image}
                className="rounded-circle"
                alt="Profile"
              />
              <h6 className="mt-3 ms-2">{display_name}</h6>
            </div>
          </Navbar.Item>
        )}
        {isLoggedIn && (
          <Navbar.Item>
            <Button
              onPress={onLogOutSuccess}
              auto
              flat
              as={Link}
              color={activeColor}
            >
              Logout
            </Button>
          </Navbar.Item>
        )}
      </Navbar.Content>
    </Navbar>
  );
}
