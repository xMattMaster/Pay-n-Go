-- Trigger che elimina tutte le auto associate al cliente dalla tabella AUTOMOBILI quando viene eliminato
DROP TRIGGER IF EXISTS elimina_auto;
DELIMITER $$
CREATE TRIGGER elimina_auto
AFTER DELETE ON APPARTENENZE_AUTO
FOR EACH ROW
BEGIN
    DELETE FROM AUTOMOBILI WHERE AUTOMOBILI.Targa = OLD.Automobile;
END$$
DELIMITER ;