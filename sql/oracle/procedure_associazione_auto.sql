CREATE OR REPLACE PROCEDURE associazione_auto(
    In_user_id IN CLIENTI.Id%TYPE,
    In_targa IN AUTOMOBILI.Targa%TYPE,
    In_modello IN AUTOMOBILI.Modello%TYPE,
    In_device IN DISPOSITIVI.Codice%TYPE
) AS 
BEGIN
BEGIN
    INSERT INTO AUTOMOBILI VALUES (In_targa, In_modello);
    INSERT INTO APPARTENENZE_AUTO VALUES (In_targa, In_user_id);
    INSERT INTO ASSOCIAZIONI_DISP_AUTO VALUES (In_device, In_targa);
    COMMIT;
END;
END associazione_auto;