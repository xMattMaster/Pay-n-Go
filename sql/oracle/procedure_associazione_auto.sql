CREATE OR REPLACE PROCEDURE associazione_auto(
    In_user_id IN CLIENTI.Id%TYPE,
    In_targa IN AUTOMOBILI.Targa%TYPE,
    In_modello IN AUTOMOBILI.Modello%TYPE,
    In_device IN DISPOSITIVI.Codice%TYPE,
    In_option NUMBER
) AS 
BEGIN
DECLARE 
    new_id DISPOSITIVI.Codice%TYPE;
BEGIN
    IF In_option = 0 THEN
        BEGIN
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
        END;
    ELSE
        BEGIN
            INSERT INTO AUTOMOBILI VALUES (In_targa, In_modello);
            INSERT INTO APPARTENENZE_AUTO VALUES (In_targa, In_user_id);
            INSERT INTO ASSOCIAZIONI_DISP_AUTO VALUES (In_device, In_targa);
            COMMIT;
        END;
	END IF;
END;
END associazione_auto;