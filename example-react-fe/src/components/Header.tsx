import styled from "styled-components";


const HeaderStyle = styled.div`
  & {
    width: auto;
    height: 64px;
    background: transparent;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px 0 16px;
  }
`

export const Header = ({actionButton}: any) => {
  return (
    <HeaderStyle>
      <div>
          <img height="48px" src="/images/cash_logo.png" alt="Wealth Bank Logo (really the CashApp Logo but meh)" />
      </div>
      <div>
        {actionButton}
      </div>
    </HeaderStyle>
  )
}