import styled from "styled-components"
import { TransactionListItem } from "./TransactionListItem"

const TransactionListStyle = styled.ul`
  & > *:not(:last-child) {
    border-bottom: 1px solid white;
  }
`

export type Transaction = {
  id: string,
  vendor: string,
  amount: number,
  description: string
}

type TransactionListProps = {
  transactions: Transaction[]
}

export const TransactionList = ({transactions}: TransactionListProps) => {
  return (
    <TransactionListStyle>
      {transactions.map((transaction: any) => (
        <TransactionListItem key={transaction.id} transaction={transaction} />
      ))}
    </TransactionListStyle>
  )
}