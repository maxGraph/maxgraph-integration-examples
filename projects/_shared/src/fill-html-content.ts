import {Client} from "@maxgraph/core";

/** Display the maxGraph version in the footer. */
const fillFooter = (): void => {
    const footer = document.querySelector<HTMLElement>('footer')!;
    footer.innerText = `Built with maxGraph ${Client.VERSION}`;
};

export type FillMainContainerOptions = {
    toolName: string;
    toolUrl: string;
};

export const fillMainContainerInnerHtml = (cssSelector: string, options: FillMainContainerOptions): void => {
    document.querySelector<HTMLDivElement>(cssSelector)!.innerHTML = `
    <h1>maxGraph <a href="${options.toolUrl}" target="_blank" rel="noopener noreferrer">${options.toolName}</a> TypeScript example</h1>
    <p>Display a test graph. Activated behaviours:</p>
    <ul>
      <li>Panning: use mouse right button</li>
      <li>Cells selection with Rubberband: use mouse left button</li>
    </ul>
    <div id="graph-container"></div>
    <footer></footer>
`;
    fillFooter();
};
