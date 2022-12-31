import FrontPageNav from "./FrontPageNav";
import PrivateArea from "./PrivateArea";
import Logo from "./Logo";
import { Stack } from "react-bootstrap";

// Contexto para el login
import { LoginContextProvider } from "../../Context/LoginContext";

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
        <LoginContextProvider>
          <PrivateArea />
        </LoginContextProvider>
      </div>
    </Stack>
  );
}

export default Header;
