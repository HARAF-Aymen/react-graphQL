import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  ADD_TRANSACTION,
  GET_ACCOUNT_BY_ID,
  GET_TRANSACTIONS_BY_ACCOUNT,
} from "./queries";

const AccountPage = () => {
  const { accountId } = useParams();
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("DEPOT");

  const { data, loading, error } = useQuery(GET_ACCOUNT_BY_ID, {
    variables: { id: accountId },
  });

  const [addTransaction] = useMutation(ADD_TRANSACTION, {
    refetchQueries: [
      { query: GET_TRANSACTIONS_BY_ACCOUNT, variables: { accountId } },
      {query: GET_ACCOUNT_BY_ID, variables: { id: accountId }}
    ],
  });

  const handleAddTransaction = () => {
    addTransaction({
      variables: {
        compteId : parseInt(accountId) ,
        montant: parseFloat(amount),
        dateTransaction : "11/23/2024",
        typeTransaction : transactionType,
      },
    }).then(() => {
      setAmount("");
      setDescription("");
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const account = data?.compteById;

  return (
    <div className="account-page">
      <h2>Account Details</h2>
      <div className="account-info">
        <p>
          <strong>Type:</strong> {account.type}
        </p>
        <p>
          <strong>Balance:</strong> {account.solde.toFixed(3)}
        </p>
        <p>
          <strong>Creation Date:</strong> {account.dateCreation}
        </p>
      </div>

      <h3>Add Transaction</h3>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleAddTransaction();
      }}>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <label>
          Type:
          <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
            <option value="DEPOT">Depot</option>
            <option value="RETRAIT">Retrait</option>
          </select>
        </label>
        <button type="submit">Add Transaction</button>
      </form>

      <h3>Transaction History</h3>
      <TransactionTable accountId={accountId} />
    </div>
  );
};

const TransactionTable = ({ accountId }) => {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS_BY_ACCOUNT, {
    variables: { accountId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <table className="transactions-table">
      <thead>
        <tr>
          <th>Type de transaction</th>
          <th>Montant</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {data?.compteTransaction.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.typeTransaction}</td>
            <td>{transaction.montant?.toFixed(3)}</td>
            <td>{transaction.dateTransaction}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AccountPage;
