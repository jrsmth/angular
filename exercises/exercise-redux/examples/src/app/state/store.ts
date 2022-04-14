
export interface IAppState {
    count: number
    todos: any[]
    // lastUpdate: Date; 
  }
  
  export const INITIAL_STATE: IAppState = { 
    count: 0,
    todos: [],
    // lastUpdate: new Date()
  }