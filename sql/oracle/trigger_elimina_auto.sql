-- Trigger che elimina tutte le auto associate al cliente dalla tabella AUTOMOBILI quando viene eliminato
CREATE OR REPLACE TRIGGER elimina_auto
AFTER DELETE ON APPARTENENZE_AUTO
FOR EACH ROW
BEGIN
    DELETE FROM AUTOMOBILI WHERE AUTOMOBILI.Targa = :old.Automobile; 
END;
 