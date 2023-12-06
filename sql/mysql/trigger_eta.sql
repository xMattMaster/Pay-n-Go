DROP TRIGGER IF EXISTS verifica_eta;
DELIMITER //
CREATE TRIGGER verifica_eta
BEFORE INSERT ON CLIENTI
FOR EACH ROW
BEGIN
    DECLARE v_eta INT;

    -- Calcola l'età sottraendo la data di nascita dalla data corrente
    SET v_eta = FLOOR(TIMESTAMPDIFF(MONTH, NEW.DataNascita, NOW()) / 12);

    -- Verifica se l'età è inferiore a 18 e genera un errore se necessario
    IF v_eta <= 18 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Devi essere maggiorenne per poterti registrare';
    END IF;
END
//
DELIMITER ;