import styled from "styled-components";
import { AiFillGithub } from "react-icons/ai";

function Footer(props) {
  return (
    <Link href="https://github.com/cmakohon" className="footer">
        <AiFillGithub
          style={{
            marginRight: ".5rem",
            fontSize: "16pt",
            marginBottom: "-4px",
          }}
        />
        github.com/cmakohon
      </Link>
  );
}

export default Footer;

const Link = styled.a`
  position: absolute;
  bottom: 60px;
  color: #959FB1;
`;