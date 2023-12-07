-- Trigger che verifica se l'utente è maggiorenne
CREATE OR REPLACE TRIGGER verifica_eta
BEFORE INSERT ON CLIENTI
FOR EACH ROW
BEGIN
    -- Calcola l'età sottraendo la data di nascita dalla data corrente
    IF MONTHS_BETWEEN(SYSDATE, :NEW.DataNascita) / 12 < 18 THEN
        raise_application_error(-20001,
        'Devi essere maggiorenne per poterti registrare ');
    END IF;
END;