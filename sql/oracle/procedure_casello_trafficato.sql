CREATE OR REPLACE PROCEDURE casello_trafficato(
    Out_somma OUT NUMBER,
    Out_max_id OUT CASELLI.Id%TYPE
) AS 
BEGIN
BEGIN
    SELECT C.Id, COUNT(*) AS NUMERO_VOLTE INTO Out_max_id, Out_somma
    FROM (TRAGITTI T JOIN CASELLI C ON T.Casello_Ingresso = C.Id)
    GROUP BY C.Id
    ORDER BY NUMERO_VOLTE DESC
    FETCH FIRST 1 ROW ONLY;
END;
END casello_trafficato;