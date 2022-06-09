import { useState } from 'react';


/*  Define hook
/*   *   *   *   *   *   *   *   *   *   */
export default function useStorage<T>( data?: T ) {

    const localStorageKey = 'app.config';

    const [ value, setValue ] = useState<T>( JSON.parse( localStorage.getItem( localStorageKey )! ) || data );

    return [ value, ( data: T ) => {

        //  save to local storage
        localStorage.setItem( localStorageKey, JSON.stringify( data ));

        //  update value
        setValue( data );
    }];
}