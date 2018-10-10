/*
* This is the file that will be used for development.
*
* When the user types 'npm run development' this
* configuration will be used.
*/

import { join } from 'path'; // Function to join paths that always returns forward slashes. Allows unity across Unix and Windows.

/*
* HotModuleReplacementPlugin: Exchanges, adds, or removes modules while an application is running
* w/o a full reload. This can significantly speed up development (only use in Dev configuration!).
*
* NoEmitOnErrorsPlugin: Documentation seems sparse; from what I interpret online, it seems like
* errors will not be documented in the build folder when there is an error during
* compilation (webpack). The errors will be suppressed.
*/
import { HotModuleReplacementPlugin, NoEmitOnErrorsPlugin } from 'webpack';

const CURRENT_WORKING_DIR = process.cwd();

const config = {
  name: 'browser', // UNSURE
  mode: 'development', // Possible Values: none, development, production (default). This is used to maximize built-in optimization.
  devtool: 'eval-source-map', // Best option for development, this one yields fast rebuild speed and real files at the cost of initially being slow.

  // Where the application is entered, this is where the program starts executing.
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    join(CURRENT_WORKING_DIR, 'client/main.js'),
  ],

  // Instruct webpack on where to dump the bundle it has created.
  // The bundle contains assets and anything else that you bundle/load with webpack
  output: {
    path: join(CURRENT_WORKING_DIR, '/dist'), // Target directory for all output files, must be absolute
    filename: 'bundle.js', // Bundle of the code compressed to a single file to limit the amount of data ther browser needs to download
    publicPath: '/dist/', // Url to the output directory resolved relative to the HTML page
  },
  module: { // Configuration for the modules (components)
    rules: [ // Specifiy how webpack should treat certain modules
      { // First set of rules
        test: /\.jsx?$/, // A module must end in the extension .jsx or .js
        exclude: /node_modules/, // Do not include any files found in node_modules
        use: [// Takes the module input and transforms it into different output
          'babel-loader', // Takes ES6 code and transpires it into code understandable by all browsers
        ],
      },
      { // Second set of rules
        test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/, // File must end in one of the specified extensions
        use: 'file-loader', // Loads additional files in webpack output
      },
    ],
  },
  plugins: [ // Additional customization to use with webpack either built in ones or community based
    new HotModuleReplacementPlugin(), // Plugins described at import
    new NoEmitOnErrorsPlugin(), // Plugins described at import
  ],
};

export default config;
