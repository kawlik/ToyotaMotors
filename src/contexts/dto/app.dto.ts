/*  App Context actions
/*   *   *   *   *   *   *   *   *   *   */
export enum AppActions {
	UPDATE,
};


/*  App Context state
/*   *   *   *   *   *   *   *   *   *   */
export interface AppState {
	isOnline: boolean,
	interval: number,
	counters: Array<{
		valueMax: number,
		valueNow: number,
		position: string,
	}>
}