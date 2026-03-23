sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user types a note and clicks 'Save'

    Note right of browser: The JS code intercepts the form submit,<br/>adds the new note to the local list object,<br/>and rerenders the note list on the page locally.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note left of server: Server saves the new note to the database
    server-->>browser: 201 Created (JSON: {"message":"note created"})
    deactivate server

    Note right of browser: The browser stays on the same page;<br/>no further HTTP requests are needed.