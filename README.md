# Pay-n-Go
Risoluzione della traccia di progetto per il corso di Basi di dati (a.a. 2023-2024) del prof. Vincenzo Moscato.
Gli studenti coinvolti nel progetto, iscritti al terzo anno in corso di ingegneria informatica presso l'Università degli Studi di Napoli "Federico II" sono: Matteo Arnese, Emanuele Barbato, Luigi Pio Castaldo, Lorenzo Cecchini.
Hosting su Netsons: https://basidati.netsons.org/

### Traccia dell'elaborato:
Realizzare una piattaforma informatica che consenta la gestione dei pagamenti autostradali da parte di utenti mediante dispositivi di telepedaggio. In particolare, si vogliono memorizzare le informazioni relative ai ``DISPOSITIVI``, dotati di un codice univoco e associate al massimo a due automobili di un dato ``CLIENTE``. Del cliente si vogliono memorizzare i dati anagrafici e le informazioni di fatturazione (il conto corrente o la carta di credito col relativo codice). Per ogni dispositivo, occorre memorizzare il ``TRAGITTO`` compiuto ai fini della fatturazione al cliente, in particolare: numero del tragitto (per quel dato dispositivo), casello di ingresso, data e ora ingresso, casello di uscita, data e ora uscita. Il ``CASELLO`` è individuato da un codice formato dall’uscita autostradale e da un numero (es. Napoli EST 1). Infine, per ogni ``AUTOMOBILE`` si vuole memorizzare targa, modello, e il proprietario nel caso sia uno dei clienti.

Si progetti la base di dati della piattaforma in grado supportare le funzionalità descritte (registrazione tragitti e pagamento pedaggi), più alcune utili a supportare analisi di tipo statistiche (es. tragitto più trafficato, ecc.).

Ogni team di progetto effettui: 
- la **progettazione concettuale**, **logica** e **fisica** della base di dati utilizzando come DBMS una qualsiasi distribuzione ORACLE, giustificando laddove necessario le scelte di progetto; 
- la definizione di opportuni **indici** per velocizzare l’esecuzione delle operazioni, della **tipologia di controllo di concorrenza** più idoneo per il caso in esame e di apposite **strategie di backup**, **recovery** e **replicazione** atte a garantire l’affidabilità del sistema di basi di dati; 
- l’implementazione in SQL di **stored procedure**, **query**, **viste** e **trigger** (es. generazione della fattura a fine mese per ogni cliente) che si ritengono necessari all’esecuzione delle operazioni richieste; 
- (facoltativo) l’**implementazione** in un qualsiasi linguaggio di programmazione (es. java, php, apsx, c#, visual basic, c++, swift, python, android, ecc.) di interfacce utente (es. web-based, desktop o mobile) per l’esecuzione di alcune operazioni sulla base di dati; nel caso di applicazione web il team di progetto potrà anche utilizzare il tool Oracle Application Express.
