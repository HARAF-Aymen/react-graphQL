import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TRANSACTIONS, ADD_TRANSACTION } from "./queries";

const TransactionManager = ({ accountId }) => {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS, {
    variables: { id: accountId },
  });
  const [form, setForm] = useState({ montant: 0, dateTransaction: "", typeTransaction: "" });
  const [addTransaction] = useMutation(ADD_TRANSACTION, {
    refetchQueries: [{ query: GET_TRANSACTIONS, variables: { id: accountId } }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({ variables: { ...form, compteId: accountId } });
    setForm({ montant: 0, dateTransaction: "", typeTransaction: "" });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {data?.compteTransaction.map((transaction) => (
          <li key={transaction.id}>
            {transaction.typeTransaction}: {transaction.montant} - {transaction.dateTransaction}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Montant"
          value={form.montant}
          onChange={(e) => setForm({ ...form, montant: parseFloat(e.target.value) })}
        />
        <input
          type="date"
          value={form.dateTransaction}
          onChange={(e) => setForm({ ...form, dateTransaction: e.target.value })}
        />
        <select
          value={form.typeTransaction}
          onChange={(e) => setForm({ ...form, typeTransaction: e.target.value })}
        >
          <option value="">Type</option>
          <option value="DEPOT">DEPOT</option>
          <option value="RETRAIT">RETRAIT</option>
        </select>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default TransactionManager;
