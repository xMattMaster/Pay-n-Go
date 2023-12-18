-- Trigger che verifica se i dispositivi inseriti sono associati al massimo a due veicoli
DROP TRIGGER IF EXISTS check_dispositivi_insert;
DELIMITER $$
CREATE TRIGGER check_dispositivi_insert
BEFORE INSERT ON ASSOCIAZIONI_DISP_AUTO
FOR EACH ROW
BEGIN
    DECLARE disp_count INT;

    SELECT COUNT(ASSOCIAZIONI_DISP_AUTO.Dispositivo) INTO disp_count FROM ASSOCIAZIONI_DISP_AUTO WHERE ASSOCIAZIONI_DISP_AUTO.Dispositivo = NEW.Dispositivo; 
	IF disp_count = 2 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Devi essere maggiorenne per poterti registrare';
    END IF;
END $$
DELIMITER ;