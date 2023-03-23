import { useEffect, useRef, useState } from "react";
import { Navbar, Button, Link, Text, useTheme } from "@nextui-org/react";
import {
  ARTIST_LONG_TERM,
  ARTIST_MEDIUM_TERM,
  ARTIST_SHORT_TERM,
  AUTHORIZE,
  TRACK_LONG_TERM,
  TRACK_MEDIUM_TERM,
  TRACK_SHORT_TERM,
  base,
} from "./Constants";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutSuccess,
  mainMenuSuccess,
} from "./redux/Actions";
import { useApiProgress } from "./functions/PendingApiCall";
import DropdownItem from "./components/DropdownItem";

export default function Nav() {
  const activeColor = "primary";

  const { isDark } = useTheme();
  const requestAuthorization = () => {
    window.location.href = AUTHORIZE();
  };

  const {
    isLoggedIn,
    display_name,
    image,
    access_token,
    refresh_token,
    userId,
  } = useSelector((store) => ({
    display_name: store.display_name,
    image: store.image,
    isLoggedIn: store.isLoggedIn,
    access_token: store.access_token,
    refresh_token: store.refresh_token,
    userId: store.userId,
  }));

  const authState = {
    display_name,
    image,
    isLoggedIn,
    access_token,
    refresh_token,
    userId,
  };

  const dispatch = useDispatch();

  const onLogOutSuccess = () => {
    dispatch(logoutSuccess());
  };


  const pendingApiCall = useApiProgress("get", base, false);
  const trackRef = useRef(null);
  const artistRef = useRef(null);
  const [trackDropdownVisible, setTrackDropdownVisible] = useState(false);
  const [artistDropdownVisible, setArtistDropdownVisible] = useState(false);
  const [howMany, setHowMany] = useState(0);

  useEffect(() => {
    const dropdownClickTracker = (event) => {
      if (
        ((artistRef.current === null ||
        !artistRef.current.contains(event.target)) &&
        (trackRef.current === null ||
        !trackRef.current.contains(event.target))) ||
        howMany > 1
      ) {
        setHowMany(0);
        setTrackDropdownVisible(false);
        setArtistDropdownVisible(false);
      }
    };
    document.addEventListener("click", dropdownClickTracker);
    return () => {
      document.removeEventListener("click", dropdownClickTracker);
    };
  }, [isLoggedIn, howMany]);

  let trackDropDownClass = "dropdown-menu ";
  let artistDropDownClass = "dropdown-menu ";

  if (trackDropdownVisible) {
    trackDropDownClass += "show";
  }
  if (artistDropdownVisible) {
    artistDropDownClass += "show";
  }

  return (
    <Navbar isBordered={isDark} variant="sticky">
      <Navbar.Brand
        style={{ cursor: "pointer" }}
        onClick={() => {
          dispatch(mainMenuSuccess(authState));
        }}
      >
        <Text b color="inherit">
          LISTATS
        </Text>
      </Navbar.Brand>
      <Navbar.Content>
        {isLoggedIn && (
          <Navbar.Item>
            <div className="dropdown">
              <button
                id="dropdown"
                className="btn btn-secondary dropdown-toggle"
                disabled={pendingApiCall}
                onClick={() => {
                  setTrackDropdownVisible(true);
                  setHowMany(howMany + 1);
                }}
                ref={trackRef}
              >
                Track
              </button>
              <ul className={trackDropDownClass}>
                <li>
                  <DropdownItem type="top" url={TRACK_SHORT_TERM} title="Top Tracks-Last 4 Week" name="4 Week"/>
                </li>
                <li>
                  <DropdownItem type="top" url={TRACK_MEDIUM_TERM} title="Top Tracks-Last 6 Month" name="6 Month"/>
                </li>
                <li>
                  <DropdownItem type="top" url={TRACK_LONG_TERM} title="Top Tracks-All Time" name="All Time"/>
                </li>
                <li>
                  <DropdownItem type="last" title="Last Played" name="Last Played"/>
                </li>
              </ul>
            </div>
          </Navbar.Item>
        )}

        {isLoggedIn && (
          <Navbar.Item>
            <div className="dropdown">
              <button
                id="dropdown"
                disabled={pendingApiCall}
                className="btn btn-secondary dropdown-toggle"
                ref={artistRef}
                onClick={() => {
                  setArtistDropdownVisible(true);
                  setHowMany(howMany + 1);
                }}
              >
                Artist
              </button>
              <ul className={artistDropDownClass}>
                <li>
                  <DropdownItem type="top" url={ARTIST_SHORT_TERM} title="Top Artists-Last 4 Week" name="4 Week"/>
                </li>
                <li>
                  <DropdownItem type="top" url={ARTIST_MEDIUM_TERM} title="Top Artists-Last 6 Month" name="6 Month"/>
                </li>
                <li>
                  <DropdownItem type="top" url={ARTIST_LONG_TERM} title="Top Artists-All Time" name="All Time"/>
                </li>
              </ul>
            </div>
          </Navbar.Item>
        )}
        {!isLoggedIn && (
          <Navbar.Item>
            <Button
              disabled={pendingApiCall}
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
              disabled={pendingApiCall}
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
