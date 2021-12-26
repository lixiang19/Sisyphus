interface Window {
  util: {
    notion: {
      getAllTodo(): Promise<ITodoListMap>
      getImmediatelyTodo(): Promise<ITodoItem[]>
      getFollowedTodo(): Promise<ITodoItem[]>
      completeTodo(pageId: ITodoItem['pageId']): Promise<ITodoItem>
      addTodo(input: string): Promise<ITodoItem>
    }
    logger: {
      log(str: any): void
    }
  }
  cp:any
  node: {
    eventBus: EventEmitter
  }
  eventBus: EventEmitter
}
type VSCode = {
  postMessage(message: any): void;
  getState(): any;
  setState(state: any): void;
};

declare const vscode: VSCode
