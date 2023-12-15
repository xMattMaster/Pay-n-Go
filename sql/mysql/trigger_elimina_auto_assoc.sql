-- Trigger che elimina tutte le auto associate al cliente a seguito della sua eliminazione
DROP TRIGGER IF EXISTS elimina_appartenenze_auto;
DELIMITER $$
CREATE TRIGGER elimina_appartenenze_auto
AFTER DELETE ON CLIENTI
FOR EACH ROW
BEGIN
    DELETE FROM APPARTENENZE_AUTO WHERE OLD.Id = APPARTENENZE_AUTO.Cliente;
END$$
DELIMITER ;