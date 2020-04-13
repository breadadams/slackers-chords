import styled from "styled-components";

const Wrap = styled.footer`
  text-align: center;
  margin-top: 200px;
  font-family: SFProText-Medium;
  font-size: 14px;
  color: #141414;
`;

export const Footer: React.FC = () => (
  <Wrap>
    <strong>Slackers Chords</strong> since 2006
  </Wrap>
);
