SELECT AUTO_INCREMENT
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = "my_basidati"
AND TABLE_NAME = "CLIENTI"

DROP PROCEDURE IF EXISTS REGISTRA_UTENTE;
CREATE PROCEDURE REGISTRA_UTENTE (
    IN In_Nome VARCHAR(20),
    IN In_Cognome VARCHAR(20),
    IN In_DataNascita DATE,
    IN In_CodiceFiscale VARCHAR(16),
    IN In_Indirizzo VARCHAR(40),
    IN In_Email VARCHAR(50),
    IN In_Password VARCHAR(50)
)
BEGIN
    DECLARE
    Id_Cliente Int;
    BEGIN
    SET Id_Cliente := SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'my_basidati' AND TABLE_NAME = 'CLIENTI';
        INSERT INTO CLIENTI (Id, Nome, Cognome, DataNascita, CodiceFiscale, Indirizzo) 
        VALUES (Id_Cliente, In_Nome, In_Cognome, In_DataNascita, In_CodiceFiscale, In_Indirizzo);
        INSERT INTO UTENTI (Email, Password, Cliente) VALUES (In_Email, In_Password, Id_Cliente);
        COMMIT;
    END;
END REGISTRA_UTENTE;