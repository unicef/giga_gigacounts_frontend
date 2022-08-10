export const createAction = <T>(type: T, payload: any): { type: T; payload: any } => ({ type, payload })
