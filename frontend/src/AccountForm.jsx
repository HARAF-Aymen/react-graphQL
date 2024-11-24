import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ACCOUNT, GET_ACCOUNTS } from "./queries";

const AccountForm = () => {
  const [form, setForm] = useState({ solde: 0, dateCreation: "", type: "" });
  const [addAccount] = useMutation(ADD_ACCOUNT, {
    refetchQueries: [{ query: GET_ACCOUNTS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addAccount({ variables: { ...form } });
    setForm({ solde: 0, dateCreation: "", type: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Account</h2>
      <input
        type="number"
        placeholder="Solde"
        value={form.solde}
        onChange={(e) => setForm({ ...form, solde: parseFloat(e.target.value) })}
      />
      <input
        type="date"
        value={form.dateCreation}
        onChange={(e) => setForm({ ...form, dateCreation: e.target.value })}
      />
      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option value="">Select Type</option>
        <option value="COURANT">COURANT</option>
        <option value="EPARGNE">EPARGNE</option>
      </select>
      <button type="submit">Add Account</button>
    </form>
  );
};

export default AccountForm;
