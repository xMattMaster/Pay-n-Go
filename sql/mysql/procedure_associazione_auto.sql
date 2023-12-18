DROP PROCEDURE IF EXISTS ASSOCIAZIONE_AUTO;
DELIMITER $$
CREATE PROCEDURE ASSOCIAZIONE_AUTO(
    In_user_id INT,
    In_targa VARCHAR(7),
    In_modello VARCHAR(20),
    In_device VARCHAR(11),
    In_option INT
)
MODIFIES SQL DATA
BEGIN
    DECLARE new_id INT;

    IF In_option = 0 THEN
        START TRANSACTION;
        
        SELECT DISPOSITIVI.Codice INTO new_id FROM DISPOSITIVI WHERE DISPOSITIVI.Codice NOT IN (
                SELECT ASSOCIAZIONI_DISP_AUTO.Dispositivo
                FROM ASSOCIAZIONI_DISP_AUTO
            ) 
        ORDER BY DISPOSITIVI.Codice ASC
        FETCH FIRST 1 ROW ONLY;
        
        INSERT INTO AUTOMOBILI (Targa, Modello) VALUES (In_targa, In_modello);
        INSERT INTO APPARTENENZE_AUTO (Automobile, Cliente) VALUES (In_targa, In_user_id);
        INSERT INTO ASSOCIAZIONI_DISP_AUTO (Dispositivo, Automobile) VALUES (new_id, In_targa);

        COMMIT;
    ELSE
        START TRANSACTION;

        INSERT INTO AUTOMOBILI (Targa, Modello) VALUES (In_targa, In_modello);
        INSERT INTO APPARTENENZE_AUTO (Automobile, Cliente) VALUES (In_targa, In_user_id);
        INSERT INTO ASSOCIAZIONI_DISP_AUTO (Dispositivo, Automobile) VALUES (In_device, In_targa);

        COMMIT;
    END IF;
END $$

DELIMITER ;