-- Trigger che elimina tutte le auto associate al cliente a seguito della sua eliminazione
CREATE OR REPLACE TRIGGER elimina_appartenenze_auto
AFTER DELETE ON CLIENTI
FOR EACH ROW
BEGIN
    DELETE FROM APPARTENENZE_AUTO WHERE :old.Id = APPARTENENZE_AUTO.Cliente; 
END;