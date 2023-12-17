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
    DECLARE max_id INT;

    IF In_option = 0 THEN
        START TRANSACTION;
        
        SELECT MAX(DISPOSITIVI.Codice) INTO max_id FROM DISPOSITIVI;
        INSERT INTO DISPOSITIVI(Codice) VALUES (max_id + 1);
        INSERT INTO AUTOMOBILI (Targa, Modello) VALUES (In_targa, In_modello);
        INSERT INTO APPARTENENZE_AUTO (Automobile, Cliente) VALUES (In_targa, In_user_id);
        INSERT INTO ASSOCIAZIONI_DISP_AUTO (Dispositivo, Automobile) VALUES (max_id + 1, In_targa);

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