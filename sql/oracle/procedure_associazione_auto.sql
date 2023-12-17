CREATE OR REPLACE PROCEDURE associazione_auto(
    In_user_id IN CLIENTI.Id%TYPE,
    In_targa IN AUTOMOBILI.Targa%TYPE,
    In_modello IN AUTOMOBILI.Modello%TYPE,
    In_device IN DISPOSITIVI.Codice%TYPE,
    In_option NUMBER;
) AS 
BEGIN
DECLARE 
    max_id DISPOSITIVI.Codice%TYPE;
BEGIN
    IF In_option = 0 THEN
        BEGIN
            SELECT MAX(DISPOSITIVI.Id) INTO max_id FROM DISPOSITIVI;
            INSERT INTO DISPOSITIVI VALUES (max_id + 1);
            INSERT INTO AUTOMOBILI (Targa, Modello) VALUES (In_targa, In_modello);
            INSERT INTO APPARTENENZE_AUTO (Automobile, Cliente) VALUES (In_targa, In_user_id);
            INSERT INTO ASSOCIAZIONI_DISP_AUTO (Dispositivo, Automobile) VALUES (max_id + 1, In_targa);
            COMMIT;
        END;
    ELSE
        BEGIN
            INSERT INTO AUTOMOBILI VALUES (In_targa, In_modello);
            INSERT INTO APPARTENENZE_AUTO VALUES (In_targa, In_user_id);
            INSERT INTO ASSOCIAZIONI_DISP_AUTO VALUES (In_device, In_targa);
            COMMIT;
        END;
END;
END associazione_auto;