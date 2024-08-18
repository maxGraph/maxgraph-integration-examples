import '@maxgraph/core/css/common.css';
import 'maxgraph-examples-shared/css/rubber-band.css'
import 'maxgraph-examples-shared/css/general-style.css'

import {Client} from "@maxgraph/core";
import {initializeGraph} from 'maxgraph-examples-shared';

document.querySelector('#root')!.innerHTML = `
    <h1>maxGraph Rsbuild TypeScript example</h1>
    <p>Display a test graph. Activated behaviours:</p>
    <ul>
      <li>Panning: use mouse right button</li>
      <li>Cells selection with Rubberband: use mouse left button</li>
    </ul>
    <div id="graph-container"></div>
    <footer></footer>
`;

const footer = document.querySelector<HTMLElement>('footer')!;
footer.innerText = `Built with maxGraph ${Client.VERSION}`;

// Creates the graph inside the given container
initializeGraph(<HTMLElement>document.querySelector('#graph-container'));
