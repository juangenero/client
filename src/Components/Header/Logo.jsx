import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import logo from '../../Images/logo.png';

export default function Logo() {
  const navigate = useNavigate();

  return (
    <Image
      width="90px"
      src={logo}
      onClick={() => navigate("/")}
      onMouseOver={() => document.body.style.cursor="pointer"}
      onMouseLeave={() => document.body.style.cursor="default"}
    />
  );
}
