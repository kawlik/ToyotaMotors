import { createContext, useContext, useEffect, useReducer } from 'react';
import { AppReducer } from './app.reducer';
import { AppActions } from './dto';


/*  Component Context
/*   *   *   *   *   *   *   *   *   *   */

//  export context object
export const AppContext = createContext<any>( null );

//  export context domain
export function useAppContext() {
    return useContext( AppContext );
};


/*  Component logic
/*   *   *   *   *   *   *   *   *   *   */
export default function AppProvider( prop: {
	children: JSX.Element | JSX.Element[]
}) {

	//	init reducer
	const [ state, dispatch ] = useReducer( AppReducer, {
		isOnline: false,
		interval: 2000,
		counters: [],
        config: {
            valueStop: 1,
            valueWarn: 5,
            style: {
                'normal': 'primary',
                'urgent': 'warning',
                'stoped': 'danger',
            }
        }
	});

    
	//	chrone updates
	useEffect(() => {
		
		//	init timeout guard
		let timeout: number;

		//	IIFE updates chrone
		( async function chroneUpdates() {

			try {

				//	fetch updated set
				const data = await ( await fetch( 'mock/counters.mock.json' )).json();

				//	update state
				dispatch({
					action: AppActions.UPDATE,
					payload: {
						...state,
						isOnline: true,
						counters: data
					},
				});

			} catch( err ) {

				//	log an error
				console.error( err );

				//	update state
				dispatch({
					action: AppActions.UPDATE,
					payload: {
						...state,
						isOnline: false,
					},
				});
			}

			//	set next timeout
			timeout = setTimeout( chroneUpdates, state.interval );

		} ())


	//	clear chrone
	return () => {

		//	clear timeout
		clearTimeout( timeout );
		
	}}, []);


/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */
return(
    <AppContext.Provider value={{
		state, dispatch
	}} >

	{ prop.children }

    </AppContext.Provider>
)};