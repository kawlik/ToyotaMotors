import { useState } from 'react';
import { useAppContext } from '../contexts/app.context';
import { installPrompt } from '../services/pwa.service';

import Config from './config';


/*	Component Logic
/*	*	*	*	*	*	*	*	*	*	*/
export default function Infobar() {
	
	//	get state
	const { state } = useAppContext();
    const [ stage, setStage ] = useState<'init'|'wait'|'done'>( 'init' );
    const [ confi, setConfi ] = useState<boolean>( false );

    // 	set ready at first
	stage === 'init' && installPrompt.then(() => setStage( 'wait' ));



/*	Component Layout
/*	*	*	*	*	*	*	*	*	*	*/
return (
<header className='app-infobar'>


	<span className='logo' >TOYOTA</span>

	{
        state.isOnline
		?	<span className='status spinner-grow text-success' role='ststus' />
		:	<span className='status spinner-grow text-danger' role='ststus' />
	}
    
    {
        stage === 'wait' &&
        <button className='btn btn-dark' onClick={ () => installPrompt
            .then( res => res.prompt())
            .then( res => setStage( 'done' ))
        } >Install</button>
    }
    
    <button className='btn btn-secondary' onClick={ () => setConfi( true ) } >Config</button>

    {
        confi &&
        <Config close={ () => setConfi( false ) } />
    }

</header>
)};