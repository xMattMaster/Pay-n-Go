-- Trigger che verifica se il casello inserito ha codice e numero unici
CREATE OR REPLACE TRIGGER check_caselli
BEFORE INSERT ON CASELLI
FOR EACH ROW
DECLARE 
    error_not_unique EXCEPTION;
    found_cod NUMBER(4);
BEGIN
    SELECT COUNT(*) INTO found_cod FROM CASELLI WHERE Codice = :new.Codice AND Numero = :new.Numero;
    IF found_cod > 0 THEN RAISE error_not_unique;
    END IF;
EXCEPTION
    WHEN error_not_unique THEN raise_application_error(-20001, 'Si è provato ad inserire un casello già esistente');
END;