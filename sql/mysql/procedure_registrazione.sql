-- Procedure per la registrazione di un nuovo utente nei due database 
DROP PROCEDURE IF EXISTS REGISTRA_UTENTE;
DELIMITER &&
CREATE PROCEDURE REGISTRA_UTENTE (
    IN In_Nome VARCHAR(20),
    IN In_Cognome VARCHAR(20),
    IN In_DataNascita DATE,
    IN In_CodiceFiscale VARCHAR(16),
    IN In_Indirizzo VARCHAR(40),
    IN In_Email VARCHAR(50),
    IN In_Password VARCHAR(72)
)
BEGIN
    -- Dichiarazione variabile temporanea
    DECLARE Id_Cliente INT;
    -- Inizializza transazione, garantisce l'atomicità
    START TRANSACTION;
    -- Inserimento dati nella tabella CLIENTI
    INSERT INTO CLIENTI (Nome, Cognome, DataNascita, CodiceFiscale, Indirizzo) 
    VALUES (In_Nome, In_Cognome, In_DataNascita, In_CodiceFiscale, In_Indirizzo);
    -- Acquisisci l'Id Cliente appena assegnato tramite AUTO_INCREMENT e memorizzalo nella variabile temporanea
    SET Id_Cliente = LAST_INSERT_ID();
    -- Inserimento dati nella tabella UTENTI
    INSERT INTO UTENTI (Email, Password, Cliente) VALUES (In_Email, In_Password, Id_Cliente);
    COMMIT;
END; $$
DELIMITER;