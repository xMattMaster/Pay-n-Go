CREATE TABLE DISPOSITIVI (
    Codice INT,
    
    CONSTRAINT PK_DISPOSITIVI PRIMARY KEY(Codice)
);

CREATE TABLE AUTOMOBILI (
    Targa VARCHAR(7),
    Modello VARCHAR(20) NOT NULL,
    
    CONSTRAINT PK_AUTOMOBILI PRIMARY KEY (Targa)
);

CREATE TABLE CLIENTI (
    Id INT AUTO_INCREMENT,
    Nome VARCHAR(20) NOT NULL,
    Cognome VARCHAR(20) NOT NULL,
    DataNascita DATE NOT NULL,
    CodiceFiscale VARCHAR(16) NOT NULL,
    Indirizzo VARCHAR(40) NOT NULL,
    CodicePagamento VARCHAR(30) DEFAULT NULL,
    TipoPagamento VARCHAR(5) DEFAULT NULL,

    CONSTRAINT PK_CLIENTI PRIMARY KEY (Id),
    CONSTRAINT CK_PAGAMENTO CHECK (TipoPagamento IS NULL OR TipoPagamento = 'Conto' OR TipoPagamento = 'Carta'),
    CONSTRAINT CK_CODICEFISCALE_UNIQUE UNIQUE (CodiceFiscale)
);


CREATE TABLE CASELLI (
    Id INT,
    Codice VARCHAR(20) NOT NULL,
    Numero INT NOT NULL,
    
	CONSTRAINT PK_CASELLI PRIMARY KEY (Id)
);

CREATE TABLE TRAGITTI (
    NumTragitto INT,
    Dispositivo INT,
	Casello_Ingresso INT NOT NULL,
    Casello_Uscita INT NOT NULL,
    DataOraIngresso DATETIME NOT NULL,
    DataOraUscita DATETIME NOT NULL,
    
    CONSTRAINT PK_TRAGITTI PRIMARY KEY (NumTragitto, Dispositivo),
    CONSTRAINT FK_TRAGITTI_DISPOSITIVI FOREIGN KEY (Dispositivo) REFERENCES DISPOSITIVI(Codice),
    CONSTRAINT FK_TRAGITTI_CASELLO_1 FOREIGN KEY (Casello_Ingresso) REFERENCES CASELLI(Id),
    CONSTRAINT FK_TRAGITTI_CASELLO_2 FOREIGN KEY (Casello_Uscita) REFERENCES CASELLI(Id)
);

CREATE TABLE ASSOCIAZIONI_DISP_AUTO (
    Dispositivo INT,
    Automobile VARCHAR(7),

    CONSTRAINT PK_ASSOCIAZIONI_DISP_AUTO PRIMARY KEY (Automobile),
    CONSTRAINT FK_ASSOCIAZIONI_DISP_AUTO_DISPOSITIVO FOREIGN KEY (Dispositivo) REFERENCES DISPOSITIVI(Codice),
    CONSTRAINT FK_ASSOCIAZIONI_DISP_AUTO_AUTOMOBILE FOREIGN KEY (Automobile) REFERENCES AUTOMOBILI(Targa) ON DELETE CASCADE
);

CREATE TABLE APPARTENENZE_AUTO (
    Automobile VARCHAR(7),
    Cliente INT NOT NULL,

    CONSTRAINT PK_APPARTENENZE_AUTO PRIMARY KEY (Automobile),
    CONSTRAINT FK_APPARTENENZE_AUTO_AUTOMOBILE FOREIGN KEY (Automobile) REFERENCES AUTOMOBILI(Targa),
    CONSTRAINT FK_APPARTENENZE_AUTO_CLIENTE FOREIGN KEY (Cliente) REFERENCES CLIENTI(Id)
    -- N.B. si ha un effetto simil ON CASCADE per entrambe le chiavi
    -- esterne attraverso i trigger "elimina_auto" ed "elimina_appartenenze_auto"
);

CREATE TABLE UTENTI (
    Id INT AUTO_INCREMENT,
    Email VARCHAR(50) NOT NULL,
	Password VARCHAR(72) NOT NULL,
    Cliente INT NOT NULL,

    CONSTRAINT PK_UTENTI PRIMARY KEY (Id),
    CONSTRAINT FK_UTENTI FOREIGN KEY (Cliente) REFERENCES CLIENTI(Id) ON DELETE CASCADE,
    CONSTRAINT CK_EMAIL_UNIQUE UNIQUE (Email)
);