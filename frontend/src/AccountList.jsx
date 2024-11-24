import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ACCOUNTS, DELETE_ACCOUNT, GET_ACCOUNTS_BY_TYPE, ADD_ACCOUNT } from "./queries";

const AccountList = () => {
  const [typeFilter, setTypeFilter] = useState("");
  const [newAccount, setNewAccount] = useState({
    type: "",
    solde: 0,
    dateCreation: "",
  });
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(
    typeFilter ? GET_ACCOUNTS_BY_TYPE : GET_ACCOUNTS,
    {
      variables: typeFilter ? { typeCompte: typeFilter } : {},
    }
  );

  const [deleteAccount] = useMutation(DELETE_ACCOUNT, {
    refetchQueries: [{ query: GET_ACCOUNTS }],
  });

  const [addAccount] = useMutation(ADD_ACCOUNT, {
    refetchQueries: [{ query: GET_ACCOUNTS }],
  });

  const handleDelete = (id) => {
    deleteAccount({ variables: { id } });
  };

  const handleSelectAccount = (account) => {
    navigate(`/account/${account.id}`);
  };

  const handleAddAccount = (e) => {
    e.preventDefault();
    // Convert date to "yyyy/MM/dd" format before submission
    const formattedDate = newAccount.dateCreation.replace(/-/g, "/");

    // Call the mutation to add the new account
    addAccount({
      variables: {
        type: newAccount.type,
        solde: parseFloat(newAccount.solde),
        dateCreation: formattedDate, // Pass the formatted date
      },
    });
    // Reset form after submission
    setNewAccount({
      type: "",
      solde: 0,
      dateCreation: "",
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="account-list">
      <h2>Accounts</h2>
      <form onSubmit={handleAddAccount} className="add-account-form">
        <div>
          <label htmlFor="type">Account Type:</label>
          <select
            id="type"
            value={newAccount.type}
            onChange={(e) =>
              setNewAccount({ ...newAccount, type: e.target.value })
            }
            required
          >
            <option value="">Select Type</option>
            <option value="COURANT">Courant</option>
            <option value="EPARGNE">Epargne</option>
          </select>
        </div>
        <div>
          <label htmlFor="solde">Balance:</label>
          <input
            type="number"
            id="solde"
            value={newAccount.solde}
            onChange={(e) =>
              setNewAccount({ ...newAccount, solde: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="dateCreation">Creation Date:</label>
          <input
            type="date"
            id="dateCreation"
            value={newAccount.dateCreation}
            onChange={(e) =>
              setNewAccount({ ...newAccount, dateCreation: e.target.value })
            }
            required
          />
        </div>
        <button type="submit">Add Account</button>
      </form>

      <div className="filter">
        <label htmlFor="typeFilter">Filter by Type:</label>
        <select
          id="typeFilter"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="COURANT">Courant</option>
          <option value="EPARGNE">Epargne</option>
        </select>
      </div>

      <table className="accounts-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Type</th>
            <th>Balance</th>
            <th>Creation Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(typeFilter ? data?.compteByType : data?.allComptes)?.map(
            (account) => (
              <tr key={account.id}>
                <td>{account.id}</td>
                <td>{account.type}</td>
                <td>{account.solde.toFixed(3)}</td>
                <td>{account.dateCreation}</td>
                <td>
                  <button
                    className="manage-btn"
                    onClick={() => handleSelectAccount(account)}
                  >
                    Manage Transactions
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(account.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AccountList;