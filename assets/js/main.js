/**
 * Main JS entrypoint
 */

'use strict';

import hyperform from 'hyperform';
import svg4everybody from 'svg4everybody';

// Add SVG External Content support to all browsers
svg4everybody();

// Form validation
hyperform(window);