DROP TRIGGER IF EXISTS APPARTENENZE_AUTO;
DELIMITER $$
CREATE TRIGGER check_appartenenze
BEFORE INSERT ON APPARTENENZE_AUTO
FOR EACH ROW
BEGIN
    DECLARE codice VARCHAR(30);
    DECLARE tipo_pagamento VARCHAR(5);

    SELECT CodicePagamento, TipoPagamento INTO codice, tipo_pagamento
    FROM CLIENTI
    WHERE Id = NEW.Cliente;

    IF codice IS NULL OR tipo_pagamento IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Il metodo di pagamento è NULL, non è possibile registrare il veicolo';
    END IF;
END $$

DELIMITER ;
