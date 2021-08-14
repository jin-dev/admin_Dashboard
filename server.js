/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
const chalk = require('chalk');
const connectHistory = require('connect-history-api-fallback');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const path = require('path');

const port = +(process.env.PORT || 5000);
const env = process.env.NODE_ENV === 'development';
const publicUrl = '/';
const app = express();

app.use(

    createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
    })
);

const registerProxy = () => {
    // proxy
    app.use(
        /\/*/,
        proxy({
            target: utransfer,
            changeOrigin: true,
            followRedirects: true,
            cookieDomainRewrite: '',
            logLevel: 'debug',
        })
    );
};

// if (publicUrl !== '/') {
//   app.get('/', (req, res) => res.redirect(publicUrl));
// }

// cors
app.use(cors());

// static
if (publicUrl !== '/') {
    app.use(publicUrl, express.static(path.resolve(__dirname, 'build')));
} else {
    app.use(express.static(path.resolve(__dirname, 'build')));
}

app.use('/css', express.static(path.resolve(__dirname, 'build/static/css')));
app.use('/js', express.static(path.resolve(__dirname, 'build/static/js')));
//   app.use('/img', express.static(path.resolve(__dirname, 'build/img')));
//   app.use('/locales', express.static(path.resolve(__dirname, 'build/locales')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build/index.html'));
});
// proxy
// registerProxy();

// history
app.use(connectHistory());

app.listen(port, async () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    process.send = process.send || function send() { };
    process.send('ready');

    console.log('\n\n=============== ENDPOINT ===============');
    console.log(chalk.red(`UTRANSFER: ${utransfer}`));
    console.log('========================================');
    console.log(`\n${chalk.green('[DEV] Server running at Port')} ${chalk.red(port)}\n`);

    console.log(`\n\n🤔  ${chalk.red('Development')} Building..\n`);
    console.log(chalk.red('⚠️  Please wait more.. until build complete.\n\n'));
});