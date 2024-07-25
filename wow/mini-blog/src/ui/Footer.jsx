import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background: #333;
  color: #fff;
  padding: 1rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
`;

function Footer() {
  return (
    <FooterWrapper>
      <p>푸터 테스트</p>
    </FooterWrapper>
  );
}

export default Footer;
