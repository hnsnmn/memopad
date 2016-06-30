import express from 'express';
import path from 'path';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

/* import express middlewares */
import morgan from 'morgan'; // HTTP REQUEST LOGGER
import bodyParser from 'body-parser'; // PARSE HTML BODY

const app = express();
const port = 3000;
const devPort = 4000;

/* setup express middlewares */
app.use(morgan('dev'));
app.use(bodyParser.json());

/* setup routers & static directory */
app.use('/', express.static(path.join(__dirname, './../public')));

/* listen server */
app.listen(port, () => {
    console.log('Express is listening on port', port);
});

/* listen devserver */
if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    );
}
