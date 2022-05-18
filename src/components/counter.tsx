/*	Component Logic
/*	*	*	*	*	*	*	*	*	*	*/
export default function Counter( prop: {
	data: {
		valueMax: number,
		valueNow: number,
		position: string,
	}
}) {

    //  set counter stage
    const stage = (() => {

        //  test stages
        if( prop.data.valueMax - prop.data.valueNow <= 1 ) return 'stoped';
        if( prop.data.valueMax - prop.data.valueNow <= 5 ) return 'urgent';

        //  default stage
        return 'normal';
        
    })();


    //  set counter style
    const style = ( property: 'bg'|'border'|'text' ) => {

        //  test stages
        if( stage === 'stoped' ) return property + '-danger';
        if( stage === 'urgent' ) return property + '-warning';

        //  default style
        return property + '-primary';
    }


/*	Component Layout
/*	*	*	*	*	*	*	*	*	*	*/
return (
<div className={ `app-counter col-12 col-sm-6 col-md-4 col-xl-3 p-1 ` } >
<div className={ `card shadow ${ style( 'border' ) }` }>

	<h5 className={ `card-header p-1 px-2 ${ style( 'border' ) }` }>
        <span className={ `status spinner-grow ${ style( 'text' ) }` } role='ststus' />
		{ prop.data.position }
	</h5>

	<div className='progress' style={{ borderRadius: 0, height: 8 }}>
		<div
			className={ `progress-bar progress-bar-striped progress-bar-animated ${ style( 'bg' ) }` }
			style={{ width: `${ 100 * ( prop.data.valueNow / prop.data.valueMax ) }%` }}/>
	</div>

	<div className='card-body py-1 px-2'>
		<p className='card-text font-monospace fw-bold m-0'>Max: { prop.data.valueMax }</p>
		<p className='card-text font-monospace fw-bold m-0'>Now: { prop.data.valueNow }</p>
	</div>
	
</div>
</div>
)};