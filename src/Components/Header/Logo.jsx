import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();

  return (
    <Image
      width="120px"
      src="https://static.vecteezy.com/system/resources/thumbnails/006/720/668/small/dog-face-logo-free-vector.jpg"
      onClick={() => navigate("/")}
      onMouseOver={() => document.body.style.cursor="pointer"}
      onMouseLeave={() => document.body.style.cursor="default"}
    />
  );
}
