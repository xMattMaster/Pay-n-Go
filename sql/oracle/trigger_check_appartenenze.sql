-- Trigger che controlla che se l'utente ha registrato un metodo di pagamento
CREATE OR REPLACE TRIGGER check_appartenenze
BEFORE INSERT ON APPARTENENZE_AUTO
FOR EACH ROW
DECLARE
    error_insert EXCEPTION;
    codice CLIENTI.CodicePagamento%TYPE;
    tipo_pagamento CLIENTI.TipoPagamento%TYPE;
BEGIN
    SELECT CLIENTI.CodicePagamento, CLIENTI.TipoPagamento INTO codice, tipo_pagamento FROM CLIENTI WHERE CLIENTI.Id = :new.Cliente;
    IF codice IS NULL OR tipo_pagamento IS NULL THEN
        RAISE error_insert;
    END IF;
EXCEPTION
    WHEN error_insert THEN raise_application_error(-20003, 'Il metodo di pagamento è NULL, non è possibile registrare il veicolo');
END;