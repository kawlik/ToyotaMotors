import { AppActions, AppState } from './dto';


/*  Define Reducer
/*   *   *   *   *   *   *   *   *   *   */
export function AppReducer( state: AppState, dispatch: {
	action: AppActions, 
	payload: AppState,
}) {

	//	destruct dispatch
	const { action, payload } = dispatch;

	//	dispatch action
	switch (action) {

		case AppActions.UPDATE:
			return { ...payload };

		default:
			return { ...state };
	}
}