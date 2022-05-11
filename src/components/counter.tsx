/*	Component Logic
/*	*	*	*	*	*	*	*	*	*	*/
export default function Counter( prop: {
	data: {
		valueMax: number,
		valueNow: number,
		position: string,

	}
}) {

	//	parse data
	const isUrgent = prop.data.valueMax - prop.data.valueNow <= 5;
	const isStoped = prop.data.valueMax - prop.data.valueNow <= 1;


/*	Component Layout
/*	*	*	*	*	*	*	*	*	*	*/
return (
<div className={ `app-counter col-12 col-sm-6 col-md-4 col-xl-3 p-1 ` } >
<div className={ `card shadow ${ isUrgent ? ( isStoped ? 'border-danger' : 'border-warning' )  : 'border-secondary' }` }>

	<h5 className={ `card-header p-1 px-2 ${ isUrgent ? 'border-warning' : 'border-dark' }` }>
		{
			isUrgent
			?	<span className={ `status spinner-grow ${ isStoped ? 'text-danger' : 'text-warning' }` } role='ststus' />
			:	<span className={ `status spinner-grow ${ isStoped ? 'text-danger' : 'text-secondary' }`} role='ststus' />
		}
		{ prop.data.position }
	</h5>

	<div className='progress' style={{ borderRadius: 0, height: 8 }}>
		<div
			className={ `progress-bar progress-bar-striped progress-bar-animated ${ isUrgent ? ( isStoped ? 'bg-danger' : 'bg-warning' )  : 'bg-primary' }` }
			style={{ width: `${ 100 * ( prop.data.valueNow / prop.data.valueMax ) }%` }}/>
	</div>

	<div className='card-body py-1 px-2'>
		<p className='card-text font-monospace fw-bold m-0'>Max: { prop.data.valueMax }</p>
		<p className='card-text font-monospace fw-bold m-0'>Now: { prop.data.valueNow }</p>
	</div>
	
</div>
</div>
)};