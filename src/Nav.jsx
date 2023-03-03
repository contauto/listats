import React from "react";
import { Navbar, Button, Link, Text, useTheme } from "@nextui-org/react";
import { AUTHORIZE } from "./Constants";

export default function Nav() {
  const activeColor = "primary";

  const { isDark } = useTheme();
  const requestAuthorization = () => {
    window.location.href = AUTHORIZE();
  };

  return (
    <Navbar isBordered={isDark} variant="sticky">
      <Navbar.Brand>
        <Text b color="inherit" hideIn="xs">
          LISTATS
        </Text>
      </Navbar.Brand>
      <Navbar.Content>
        <Navbar.Item>
          <Button
            onClick={requestAuthorization}
            auto
            flat
            as={Link}
            color={activeColor}
          >
            Login With Spotify
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}
