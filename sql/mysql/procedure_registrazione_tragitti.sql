DROP PROCEDURE IF EXISTS REGISTRAZIONE_TRAGITTI
DELIMITER //
CREATE PROCEDURE REGISTRAZIONE_TRAGITTI(
    IN In_Cod_Disp INT,
    IN In_Cod_Cas_E VARCHAR(20),
    IN In_Num_Cas_E INT,
    IN In_Cod_Cas_U VARCHAR(20),
    IN In_Num_Cas_U INT,
    IN In_DataOra_I DATETIME,
    IN In_DataOra_U DATETIME
)
MODIFIES SQL DATA
BEGIN
    DECLARE id_ingresso INT;
    DECLARE id_uscita INT;
    DECLARE num_trag INT;
    START TRANSACTION;
    SELECT Id INTO id_ingresso FROM CASELLI WHERE Codice = In_Cod_Cas_E AND Numero = In_Num_Cas_E;
    SELECT Id INTO id_uscita FROM CASELLI WHERE Codice = In_Cod_Cas_U AND Numero = In_Num_Cas_U;
    SELECT MAX(NumTragitto) INTO num_trag FROM TRAGITTI WHERE Dispositivo = In_Cod_Disp;
    INSERT INTO TRAGITTI VALUES (num_trag + 1, In_Cod_Disp, id_ingresso, id_uscita, In_DataOra_I, In_DataOra_U);
    COMMIT;
END //
DELIMITER ;
