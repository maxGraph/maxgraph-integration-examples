import { initializeGraph } from './generate-graph';
import {fillMainContainerInnerHtml, FillMainContainerOptions} from "./fill-html-content";

export {initializeGraph} from './generate-graph';

export const initializeHtmlAndGraph = (cssSelector: string, options: FillMainContainerOptions): void => {
    fillMainContainerInnerHtml(cssSelector, options);
    initializeGraph();
};
