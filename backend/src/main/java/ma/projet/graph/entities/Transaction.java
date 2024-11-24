package ma.projet.graph.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double montant;
    @Temporal(TemporalType.DATE)
    private Date dateTransaction;
    private TypeTransaction typeTransaction;
    @ManyToOne
    @JoinColumn(name = "compte_id")
    private Compte compte;
}