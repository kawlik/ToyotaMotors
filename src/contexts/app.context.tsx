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
		interval: 1000,
		counters: [],
        config: {
            valueWarn: 5,
            valueStop: 1,
            style: {
                'normal': 'primary',
                'urgent': 'warning',
                'stoped': 'danger',
            }
        }
	});


	//	chrone updates
    useEffect(() => {

        //  clear new timeout
        const timeout = setTimeout(() => 
            fetch( 'mock/counters.mock.json' )
            .then( res => res.json())
            .then( res => dispatch({
                action: AppActions.UPDATE,
                payload: {
                    ...state,
                    isOnline: true,
                    counters: res
                }
            }))
            .catch(() => dispatch({
                action: AppActions.UPDATE,
                payload: {
                    ...state,
                    isOnline: false,
                }
            })
        ), state.interval );

    return () => {

        //  clear overflown timeout
        clearTimeout( timeout );

    }});


/*  Component layout
/*   *   *   *   *   *   *   *   *   *   */
return(
    <AppContext.Provider value={{
		state, dispatch
	}} >

	{ prop.children }

    </AppContext.Provider>
)};