CREATE OR REPLACE PROCEDURE registrazione_tragitti(
    In_Cod_Disp IN TRAGITTI.Dispositivo%TYPE,
    In_Cod_Cas_E IN CASELLI.Codice%TYPE,
    In_Num_Cas_E IN CASELLI.Numero%TYPE,
    In_Cod_Cas_U IN CASELLI.Codice%TYPE,
    In_Num_Cas_U IN CASELLI.Numero%TYPE,
    In_DataOra_I IN TRAGITTI.DataOraIngresso%TYPE,
    In_DataOra_U IN TRAGITTI.DataOraUscita%TYPE
) AS 
BEGIN
DECLARE
    id_ingresso CASELLI.Id%TYPE;
    id_uscita CASELLI.Id%TYPE;
    num_trag TRAGITTI.NumTragitto%TYPE;
BEGIN
    SELECT CASELLI.Id INTO id_ingresso FROM CASELLI WHERE CASELLI.Codice = In_Cod_Cas_E AND CASELLI.Numero = In_Num_Cas_E;
    SELECT CASELLI.Id INTO id_uscita FROM CASELLI WHERE CASELLI.Codice = In_Cod_Cas_U AND CASELLI.Numero = In_Num_Cas_U;
    SELECT MAX(TRAGITTI.NumTragitto) INTO num_trag FROM TRAGITTI WHERE TRAGITTI.Dispositivo = In_Cod_Disp;
    INSERT INTO TRAGITTI VALUES (num_trag + 1, In_Cod_Disp, id_ingresso, id_uscita, In_DataOra_I, In_DataOra_U);
    COMMIT;
END;
END registrazione_tragitti;