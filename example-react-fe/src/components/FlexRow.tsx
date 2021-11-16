import styled from "styled-components";


export const FlexRow = styled.div<{justify?: string, align?: string}>`
  & {
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.justify || 'flex-start'};
    align-items: ${props => props.align || 'center'};
  }
`