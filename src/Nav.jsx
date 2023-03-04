import { React } from "react";
import { Navbar, Button, Link, Text, useTheme } from "@nextui-org/react";
import {
  ARTIST_LONG_TERM,
  ARTIST_MEDIUM_TERM,
  ARTIST_SHORT_TERM,
  AUTHORIZE,
  TRACK_LONG_TERM,
  TRACK_MEDIUM_TERM,
  TRACK_SHORT_TERM,
} from "./Constants";
import { useDispatch, useSelector } from "react-redux";
import { dataHandler, logoutSuccess } from "./redux/Actions";

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

  const data = (url,text) => {
    dispatch(dataHandler(url,text));
  };

  return (
    <Navbar isBordered={isDark} variant="sticky">
      <Navbar.Brand>
        <Text b color="inherit">
          LISTATS
        </Text>
      </Navbar.Brand>
      <Navbar.Content>
        {isLoggedIn && (
          <Navbar.Item>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Track
              </button>
              <ul className="dropdown-menu">
                <li>
                  <h6  style={{cursor:"pointer"}}
                    onClick={() => {
                      data(TRACK_SHORT_TERM,"Top Tracks-Last 4 Week");
                    }}
                    className="dropdown-item"
                  >
                    4 Week
                  </h6>
                </li>
                <li>
                  <h6 style={{cursor:"pointer"}}
                    onClick={() => {
                      data(TRACK_MEDIUM_TERM,"Top Tracks-Last 6 Month");
                    }}
                    className="dropdown-item"
                  >
                    6 Month
                  </h6>
                </li>
                <li>
                  <h6 style={{cursor:"pointer"}}
                    onClick={() => {
                      data(TRACK_LONG_TERM,"Top Tracks-All Time");
                    }}
                    className="dropdown-item"
                  >
                    All Time
                  </h6>
                </li>
              </ul>
            </div>
          </Navbar.Item>
        )}

        {isLoggedIn && (
          <Navbar.Item>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Artist
              </button>
              <ul className="dropdown-menu">
                <li>
                  <h6 style={{cursor:"pointer"}}
                    onClick={() => {
                      data(ARTIST_SHORT_TERM,"Top Artists-Last 4 Week");
                    }}
                    className="dropdown-item"
                  >
                    4 Week
                  </h6>
                </li>
                <li>
                  <h6 style={{cursor:"pointer"}}
                    onClick={() => {
                      data(ARTIST_MEDIUM_TERM,"Top Artists-Last 6 Month");
                    }}
                    className="dropdown-item"
                  >
                    6 Month
                  </h6>
                </li>
                <li>
                  <h6 style={{cursor:"pointer"}}
                    onClick={() => {
                      data(ARTIST_LONG_TERM,"Top Artists-All Time");
                    }}
                    className="dropdown-item"
                  >
                    All Time
                  </h6>
                </li>
              </ul>
            </div>
          </Navbar.Item>
        )}
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
          <Navbar.Item hideIn={"xs"}>
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
