interface Window {
  electronApi: any
}
type VSCode = {
  postMessage(message: any): void;
  getState(): any;
  setState(state: any): void;
};
declare module 'react-gantt-timeline';
declare const vscode: VSCode
