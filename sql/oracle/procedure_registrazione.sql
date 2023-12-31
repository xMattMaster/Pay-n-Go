CREATE OR REPLACE PROCEDURE REGISTRA_UTENTE (
    In_Nome IN CLIENTI.Nome%TYPE,
    In_Cognome IN CLIENTI.Cognome%TYPE,
    In_DataNascita IN CLIENTI.DataNascita%TYPE,
    In_CodiceFiscale IN CLIENTI.CodiceFiscale%TYPE,
    In_Indirizzo IN CLIENTI.Indirizzo%TYPE,
    In_Email IN UTENTI.Email%TYPE,
    In_Password IN UTENTI.Password%TYPE
)
AS
BEGIN
    DECLARE
    -- Acquisisci il successivo Id Cliente dal contatore apposito e memorizzalo nella variabile temporanea
    -- (nel frattempo il contatore viene incrementato, garantendo l'assenza di problematiche di concorrenza)
    Id_Cliente CLIENTI.Id%TYPE := clienti_id_seq.nextval;
    BEGIN
        -- Inserimento dati nella tabella CLIENTI
        INSERT INTO CLIENTI (Id, Nome, Cognome, DataNascita, CodiceFiscale, Indirizzo) 
        VALUES (Id_Cliente, In_Nome, In_Cognome, In_DataNascita, In_CodiceFiscale, In_Indirizzo);
        -- Inserimento dati nella tabella UTENTI
        INSERT INTO UTENTI (Email, Password, Cliente) VALUES (In_Email, In_Password, Id_Cliente);
        COMMIT;
    END;
END REGISTRA_UTENTE;