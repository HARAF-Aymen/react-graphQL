package ma.projet.graph.controllers;

import lombok.AllArgsConstructor;
import ma.projet.graph.entities.Compte;
import ma.projet.graph.entities.Transaction;
import ma.projet.graph.entities.TransactionInput;
import ma.projet.graph.entities.TypeTransaction;
import ma.projet.graph.repositories.CompteRepository;
import ma.projet.graph.repositories.TransactionRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Map;

@Controller
@AllArgsConstructor
public class TransactionControllerGraphQL {

    private TransactionRepository transactionRepository;
    private CompteRepository compteRepository;

    @QueryMapping
    public List<Transaction> getTransactions(){
        return transactionRepository.findAll();
    }

    @QueryMapping
    public List<Transaction> compteTransaction(@Argument Long id) {
        return transactionRepository.findByCompteId(id);
    }

    @QueryMapping
    public Map<String, Object> transactionStats() {
        long count = transactionRepository.count();
        double sumDepots = transactionRepository.sumByType(TypeTransaction.DEPOT);
        double sumRetraits = transactionRepository.sumByType(TypeTransaction.RETRAIT);

        return Map.of(
                "count", count,
                "sumDepots", sumDepots,
                "sumRetraits", sumRetraits
        );
    }

    @MutationMapping
    public Transaction addTransaction(@Argument TransactionInput transactionInput) {
        var compte = compteRepository.findById((long) transactionInput.getCompteId())
                .orElseThrow(() -> new RuntimeException("Compte introuvable"));

        Transaction transaction = new Transaction();
        transaction.setMontant(transactionInput.getMontant());
        transaction.setDateTransaction(transactionInput.getDateTransaction());
        transaction.setTypeTransaction(transactionInput.getTypeTransaction());
        transaction.setCompte(compte);

        if (transactionInput.getTypeTransaction() == TypeTransaction.DEPOT) {
            compte.setSolde(compte.getSolde() + transactionInput.getMontant());
        } else if (transactionInput.getTypeTransaction() == TypeTransaction.RETRAIT) {
            if (compte.getSolde() < transactionInput.getMontant()) {
                throw new RuntimeException("Solde insuffisant pour le retrait.");
            }
            compte.setSolde(compte.getSolde() - transactionInput.getMontant());
        }
        compteRepository.save(compte);
        return transactionRepository.save(transaction);
    }

}
