# Esempio di REST API con Interfaccia Client

Questo progetto dimostra l'implementazione di una REST API utilizzando Node.js ed Express, con una interfaccia client integrata per testare le chiamate API.

## Indice

- [Descrizione](#descrizione)
- [Requisiti](#requisiti)
- [Installazione](#installazione)
- [Utilizzo](#utilizzo)
- [Endpoints API](#endpoints-api)
- [Struttura del Progetto](#struttura-del-progetto)

## Descrizione

Questa applicazione fornisce una API REST per la gestione di un database semplificato di persone, con una interfaccia web che permette di testare facilmente le diverse richieste HTTP (GET, POST, PUT, DELETE). L'API manipola i dati memorizzati in un file JSON locale.

## Requisiti

- Node.js (versione consigliata: 14.x o superiore)
- npm (Node Package Manager)

## Installazione

1. Clona il repository o scarica i file

2. Naviga nella directory del progetto
   ```
   cd 9-REST_API_EXAMPLE
   ```

3. Installa le dipendenze
   ```
   npm install
   ```

4. Avvia il server
   ```
   node index.js
   ```
   
5. Il server sarà disponibile all'indirizzo: [http://localhost:3000](http://localhost:3000)

## Utilizzo

Quando accedi all'applicazione tramite browser all'indirizzo [http://localhost:3000](http://localhost:3000), vedrai un'interfaccia con:

- Selezione del METODO HTTP (GET, POST, PUT, DELETE)
- Campo URL per specificare l'endpoint
- Campo INTESTAZIONI per le header HTTP (impostato di default a `{"Content-Type": "application/json"}`)
- Campo CORPO RICHIESTA per i dati JSON da inviare (per POST e PUT)
- Pulsante INVIA per eseguire la richiesta
- Area RISPOSTA dove viene visualizzato il risultato della chiamata API

## Endpoints API

L'API espone i seguenti endpoint:

### GET /api/persone
Restituisce l'elenco completo di tutte le persone

### GET /api/persone/:id
Restituisce i dati di una specifica persona in base all'ID

### POST /api/persone
Crea una nuova persona. Richiede un corpo JSON con i dati della persona nel formato:
```json
{
  "id": "21",
  "nome": "Nuovo",
  "cognome": "Utente",
  "interessi": ["interesse1", "interesse2"]
}
```

### PUT /api/persone/:id
Aggiorna i dati di una persona esistente. Richiede un corpo JSON con i dati aggiornati.

### DELETE /api/persone/:id
Elimina una persona in base all'ID specificato.

## Struttura del Progetto

- `index.js`: File principale del server Express
- `persone.json`: Database JSON contenente i dati delle persone
- `public/`: Directory per i file statici
  - `index.html`: Interfaccia HTML per il client API
  - `style.css`: Fogli di stile CSS
  - `client.js`: Codice JavaScript per l'interfaccia client
- `README.md`: Questo file di documentazione
