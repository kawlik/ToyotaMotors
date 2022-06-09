import axios from 'axios';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { AppReducer } from './app.reducer';
import { AppActions, AppStore } from './dto';
import useStorage from './hooks/storage';


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

    //  init storage
    const [ store, dispatchStore ] = useStorage<AppStore>({
        valueWarn: 5,
        valueStop: 1,
        style: {
            'normal': 'primary',
            'urgent': 'warning',
            'stoped': 'danger',
        }
    });


	//	init reducer
	const [ state, dispatchState ] = useReducer( AppReducer, {
		isOnline: false,
		interval: 2000,
		counters: [],
	});

    
	//	chrone updates
	useEffect(() => {
		
		//	init timeout guard
		let timeout: number;

		//	IIFE updates chrone
		( async function chroneUpdates() {

			try {

				//	fetch updated set
				const data: {
                    MachiningAndon: Array<{
                        valueMax: number,
                        valueNow: number,
                        Strefa: number,
                        NrMaszyny: string,
                        TypLinii: string,
                        NrStacji: string,
                        Linia: string,
                        Model: string
                    }>
                } = ( await axios.get( window.location.search.includes( 'debug' ) ? 'http://10.115.2.16:8081/api/TMMP-J/AndonMachining/machining' : 'mock/counters.mock.json' )).data;

				//	update state
				dispatchState({
					action: AppActions.UPDATE,
					payload: {
						...state,
						isOnline: true,
						counters: data.MachiningAndon.map( counter => ({
                            valueMax: counter.valueMax,
                            valueNow: counter.valueNow,
                            position: `${ counter.TypLinii } ${ counter.Linia } ${ counter.NrStacji } ${ counter.Model } ${ counter.NrMaszyny }`,
                        })),
					},
				});

			} catch( err ) {

				//	log an error
				console.error( err );

				//	update state
				dispatchState({
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
		state, dispatchState,
        store, dispatchStore,
	}} >

	{ prop.children }

    </AppContext.Provider>
)};