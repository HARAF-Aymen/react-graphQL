package ma.projet.graph.entities;
import lombok.Data;
import ma.projet.graph.entities.TypeTransaction;

import java.util.Date;

@Data
public class TransactionInput {
    private double montant;
    private Date dateTransaction;
    private TypeTransaction typeTransaction;
    private int compteId;
}