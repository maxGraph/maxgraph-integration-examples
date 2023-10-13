import '@maxgraph/core/css/common.css';
import 'maxgraph-examples-shared/css/rubber-band.css'
import 'maxgraph-examples-shared/css/general-style.css'

import {Client} from '@maxgraph/core';
import {initializeGraph} from 'maxgraph-examples-shared';

// display the maxGraph version in the footer
const footer = document.querySelector<HTMLElement>('footer')!;
footer.innerText = `Built with maxGraph ${Client.VERSION}`;

// Creates the graph inside the given container
initializeGraph(<HTMLElement>document.querySelector('#graph-container'));
