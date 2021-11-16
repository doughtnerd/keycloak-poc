

export const TransactionListItem = ({ transaction }: any) => {
  return (
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      <span>
        <h4 style={{display: 'inline-block'}}>{transaction.vendor}</h4> - {transaction.description}
      </span>
      <span>
        <div>{Intl.NumberFormat('en-us', {maximumFractionDigits: 2, minimumFractionDigits: 2, style: 'currency', currency: 'USD'}).format(transaction.amount)}</div>
      </span>
    </div>
  )
}