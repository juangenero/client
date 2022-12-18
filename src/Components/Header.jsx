import React from "react";

import FrontPageNav from "./Header/NavFrontPage";
import PrivateArea from "./Header/PrivateArea";
import Logo from "./Header/Logo";
import { Stack } from "react-bootstrap";

function Header() {
  return (
    <Stack direction="horizontal" className="my-3">
      <div className="mx-auto">
        <Logo />
      </div>

      <div className="mx-auto">
        <FrontPageNav />
      </div>

      <div className="mx-auto">
        <PrivateArea />
      </div>
    </Stack>
  );
}

export default Header;
