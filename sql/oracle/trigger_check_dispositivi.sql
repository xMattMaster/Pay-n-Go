-- Trigger che controlla se il dispositivo è associato a più di due auto
CREATE OR REPLACE TRIGGER check_dispositivi
BEFORE INSERT OR UPDATE ON ASSOCIAZIONI_DISP_AUTO
FOR EACH ROW
DECLARE 
    error_cant_insert EXCEPTION; 
    disp_count NUMBER(4); 
BEGIN 
    SELECT COUNT(ASSOCIAZIONI_DISP_AUTO.Dispositivo) INTO disp_count FROM ASSOCIAZIONI_DISP_AUTO WHERE ASSOCIAZIONI_DISP_AUTO.Dispositivo = :new.Dispositivo; 
	IF disp_count = 2 THEN RAISE error_cant_insert; 
    END IF; 
EXCEPTION 
    WHEN error_cant_insert THEN raise_application_error(-20004, 'Impossibile inserire il dispositivo, è già associato a due automobili'); 
END;