import { useState } from 'react';


/*  Define hook
/*   *   *   *   *   *   *   *   *   *   */
export default function useStorage<T>() {

    const localStorageKey = 'app.config';

    const [ value, setValue ] = useState<T>( JSON.parse( localStorage.getItem( localStorageKey )! ) || null );

    return [ value, ( data: T ) => {

        //  save to local storage
        localStorage.setItem( localStorageKey, JSON.stringify( data ));

        //  update value
        setValue( data );
    }];
}