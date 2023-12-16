CREATE OR REPLACE PROCEDURE casello_trafficato(
    Out_somma OUT NUMBER,
    Out_max_id OUT CASELLI.Id%TYPE
) AS 
BEGIN
DECLARE
    somma NUMBER(4) := 0;
    max_id CASELLI.Id%TYPE;
BEGIN
    SELECT C.Id, COUNT(*) AS NUMERO_VOLTE INTO max_id, somma FROM (TRAGITTI T JOIN CASELLI C ON T.Casello_Ingresso = C.Id) JOIN CASELLI C2 ON C2.Id = T.Casello_Uscita
    GROUP BY C.Id
    ORDER BY NUMERO_VOLTE DESC
    FETCH FIRST 1 ROW ONLY;
END;
END casello_trafficato;