
import styled from "styled-components"

export const TextButton = styled.button`
& {
  border: none;
  background-color: inherit;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  display: inline-block;

  color: ${props => props.color};

  :hover {
    filter: brightness(60%)
  }
}
`