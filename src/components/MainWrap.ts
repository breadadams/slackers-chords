import styled from "styled-components";

export const MainWrap = styled.main`
  width: 100%;
  background: #fff;
  border-radius: 20px 20px 0 0;
  margin-top: -20px;
  padding: 60px 42px 20px;
  box-shadow: 0 -2px 10px 0 rgba(32, 32, 32, 0.2);
  position: relative;
  z-index: 1;

  @media screen and (max-width: 720px) {
    padding: 38px 24px 20px;
  }
`;
