import { gql } from "@apollo/client";

export const GET_ACCOUNTS = gql`
  query getAccounts {
    allComptes {
      id
      solde
      dateCreation
      type
    }
  }
`;

export const GET_ACCOUNTS_BY_TYPE = gql`
  query GetAccountsByType($typeCompte: TypeCompte) {
    compteByType(typeCompte: $typeCompte) {
      id
      solde
      dateCreation
      type
    }
  }
`;

export const ADD_ACCOUNT = gql`
  mutation addAccount($solde: Float!, $dateCreation: String!, $type: TypeCompte!) {
    saveCompte(compte: { solde: $solde, dateCreation: $dateCreation, type: $type }) {
      id
    }
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation deleteAccount($id: ID!) {
    deleteCompte(id: $id)
  }
`;

export const GET_TRANSACTIONS = gql`
  query getTransactions($id: ID!) {
    compteTransaction(id: $id) {
      id
      montant
      dateTransaction
      typeTransaction
    }
  }
`;

export const ADD_TRANSACTION = gql`
  mutation addTransaction($montant: Float!, $dateTransaction: String!, $typeTransaction: TypeTransaction!, $compteId: Int!) {
    addTransaction(transactionInput: { montant: $montant, dateTransaction: $dateTransaction, typeTransaction: $typeTransaction, compteId: $compteId }) {
      id
    }
  }
`;

export const GET_TRANSACTIONS_BY_ACCOUNT = gql`
  query GetTransactionsByAccount($accountId: ID!) {
    compteTransaction(id: $accountId) {
      id
      montant
      typeTransaction
      dateTransaction
    }
  }
`;

export const GET_ACCOUNT_BY_ID = gql`
  query GetAccountById($id: ID!) {
    compteById(id: $id) {
      id
      type
      solde
      dateCreation
    }
  }
`;
