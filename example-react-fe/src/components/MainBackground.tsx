import styled from "styled-components"

export const MainBackground = styled.div`
  & {
    background-image: url("/images/bank_generated.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    filter: brightness(33%);
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
  }
`