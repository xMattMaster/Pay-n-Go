-- Trigger che verifica se il casello inserito ha codice e numero unici
DROP TRIGGER IF EXISTS check_caselli;
DELIMITER $$
CREATE TRIGGER check_caselli
BEFORE INSERT ON CASELLI
FOR EACH ROW
BEGIN
    DECLARE found_cod INT;
    
    SELECT COUNT(*) INTO found_cod FROM CASELLI WHERE Codice = NEW.Codice AND Numero = NEW.Numero;
    
    IF found_cod > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Si è provato ad inserire un casello già esistente';
    END IF;
END$$
DELIMITER ;