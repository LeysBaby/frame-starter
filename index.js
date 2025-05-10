const express = require('express');
const app = express();

app.use(express.json());

// Strona główna (żeby uniknąć "Cannot GET /")
app.get('/', (req, res) => {
    res.send('Witaj! Frame znajduje się pod /frame');
});

// Pierwszy ekran frame’a
app.get('/frame', (req, res) => {
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="https://i.imgur.com/DFkpwp2.png" />
            <meta property="fc:frame:button:1" content="Check" />
            <meta property="fc:frame:post_url" content="${req.protocol}://${req.get('host')}/result" />
        </head>
        <body>
            <h1>Twoje szanse u MONAD Girl</h1>
        </body>
        </html>
    `;
    res.set('Content-Type', 'text/html; charset=utf-8');
    res.set('Cache-Control', 'no-store');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Length', Buffer.byteLength(html));
    res.send(html);
});

// Ekran z wynikami
app.post('/result', (req, res) => {
    const attractiveness = Math.floor(Math.random() * 100) + 1; // Losowy % (1-100)
    const dateChance = Math.floor(Math.random() * 100) + 1; // Losowy % (1-100)
    const countries = ['Brazylia', 'Japonia', 'Włochy', 'Australia', 'Kenia', 'Kanada', 'Polska'];
    const crush = countries[Math.floor(Math.random() * countries.length)]; // Losowy kraj

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="https://i.imgur.com/DFkpwp2.png" />
            <meta property="fc:frame:button:1" content="Sprawdź jeszcze raz" />
            <meta property="fc:frame:post_url" content="${req.protocol}://${req.get('host')}/frame" />
        </head>
        <body>
            <h1>Wyniki:</h1>
            <p>Twój poziom atrakcyjności: ${attractiveness}%</p>
            <p>Szansa na randkę: ${dateChance}%</p>
            <p>Crush: ${crush}</p>
        </body>
        </html>
    `;
    res.set('Content-Type', 'text/html; charset=utf-8');
    res.set('Cache-Control', 'no-store');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Length', Buffer.byteLength(html));
    res.send(html);
});

app.listen(3000, () => {
    console.log('Frame działa!');
});
