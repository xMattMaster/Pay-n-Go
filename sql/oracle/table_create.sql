CREATE TABLE DISPOSITIVI (
    Codice NUMBER(6),
    
    CONSTRAINT PK_DISPOSITIVI PRIMARY KEY(Codice)
);

CREATE TABLE AUTOMOBILI (
    Targa VARCHAR2(7),
    Modello VARCHAR2(20) NOT NULL,
    
    CONSTRAINT PK_AUTOMOBILI PRIMARY KEY (Targa)
);

CREATE SEQUENCE clienti_id_seq START WITH 1;

CREATE TABLE CLIENTI (
    Id NUMBER(6) DEFAULT clienti_id_seq.nextval NOT NULL,
    Nome VARCHAR2(20) NOT NULL,
    Cognome VARCHAR2(20) NOT NULL,
    DataNascita DATE NOT NULL,
    CodiceFiscale VARCHAR2(16) NOT NULL,
    Indirizzo VARCHAR(40) NOT NULL,
    CodicePagamento VARCHAR2(30) DEFAULT NULL,
    TipoPagamento VARCHAR2(5) DEFAULT NULL,
    
    CONSTRAINT PK_CLIENTI PRIMARY KEY (Id),
    CONSTRAINT CK_PAGAMENTO CHECK (TipoPagamento IS NULL OR TipoPagamento = 'Conto' OR TipoPagamento = 'Carta'),
    CONSTRAINT CK_CODICEFISCALE_UNIQUE UNIQUE (CodiceFiscale)
);

CREATE SEQUENCE caselli_id_seq START WITH 1;

CREATE TABLE CASELLI (
    Id NUMBER(4) DEFAULT caselli_id_seq.nextval,
    Codice VARCHAR2(20) NOT NULL,
    Numero NUMBER(2) NOT NULL,
    
	CONSTRAINT PK_CASELLI PRIMARY KEY (Id)
);

-- CREATE SEQUENCE tragitti_num_seq START WITH 1;
-- NumTragitto è un contatore relativo all'utente, non al database!

CREATE TABLE TRAGITTI (
    -- NumTragitto NUMBER(5) DEFAULT tragitti_num_seq.nextval NOT NULL,
    NumTragitto NUMBER(5) NOT NULL,
    Dispositivo NUMBER(6),
	Casello_Ingresso NUMBER(4) NOT NULL,
    Casello_Uscita NUMBER(4) NOT NULL,
    DataOraIngresso DATE NOT NULL,
    DataOraUscita DATE NOT NULL,
    
    CONSTRAINT PK_TRAGITTI PRIMARY KEY (NumTragitto, Dispositivo),
    CONSTRAINT FK_TRAGITTI_DISPOSITIVI FOREIGN KEY (Dispositivo) REFERENCES DISPOSITIVI(Codice),
    CONSTRAINT FK_TRAGITTI_CASELLO_1 FOREIGN KEY (Casello_Ingresso) REFERENCES CASELLI(Id),
    CONSTRAINT FK_TRAGITTI_CASELLO_2 FOREIGN KEY (Casello_Uscita) REFERENCES CASELLI(Id)
);

CREATE TABLE ASSOCIAZIONI_DISP_AUTO (
    Dispositivo NUMBER(6),
    Automobile VARCHAR2(7),

    CONSTRAINT PK_ASSOCIAZIONI_DISP_AUTO PRIMARY KEY (Automobile),
    CONSTRAINT FK_ASSOCIAZIONI_DISP_AUTO_DISPOSITIVO FOREIGN KEY (Dispositivo) REFERENCES DISPOSITIVI(Codice),
    CONSTRAINT FK_ASSOCIAZIONI_DISP_AUTO_AUTOMOBILE FOREIGN KEY (Automobile) REFERENCES AUTOMOBILI(Targa) ON DELETE CASCADE
);

CREATE TABLE APPARTENENZE_AUTO (
    Automobile VARCHAR2(7),
    Cliente NUMBER(6) NOT NULL,

    CONSTRAINT PK_APPARTENENZE_AUTO PRIMARY KEY (Automobile),
    CONSTRAINT FK_APPARTENENZE_AUTO_AUTOMOBILE FOREIGN KEY (Automobile) REFERENCES AUTOMOBILI(Targa) ON DELETE CASCADE,
    CONSTRAINT FK_APPARTENENZE_AUTO_CLIENTE FOREIGN KEY (Cliente) REFERENCES CLIENTI(Id) ON DELETE CASCADE
    -- TODO: trigger AFTER DELETE che elimini anche tutte le auto associate all'utente
);

CREATE SEQUENCE utenti_id_seq START WITH 1;

CREATE TABLE UTENTI (
    Id NUMBER(6) DEFAULT utenti_id_seq.nextval,
    Email VARCHAR2(50),
	Password VARCHAR2(72) NOT NULL,
    Cliente NUMBER(6) NOT NULL,

    CONSTRAINT PK_UTENTI PRIMARY KEY (Id),
    CONSTRAINT FK_UTENTI FOREIGN KEY (Cliente) REFERENCES CLIENTI(Id) ON DELETE CASCADE,
    CONSTRAINT CK_EMAIL_UNIQUE UNIQUE (Email)
);
