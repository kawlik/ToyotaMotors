import Counter from './counter';

import { useAppContext } from '../contexts/app.context';


/*	Component Logic
/*	*	*	*	*	*	*	*	*	*	*/
export default function Counters() {

	//	get state
	const { state } = useAppContext();


/*	Component Layout
/*	*	*	*	*	*	*	*	*	*	*/
return (
<article className='app-counters' >

	<section className='urgent' >

		<h2 className='display-6'>Urgent</h2>
		<hr/>

		<div className='list' >
		{
			state.counters
				.filter(( counter: any ) => counter.valueMax - counter.valueNow <= 5 )
                .sort(( p: any, q: any ) => p.valueMax - p.valueNow > q.valueMax - q.valueNow ? 1 : -1 )
				.map(( counter: any ) => <Counter key={ counter.position } data={ counter } /> )
		}		
		</div>

	</section>

	<section className='all' >

		<h2 className='display-6'>All</h2>
		<hr/>

		<div className='list' >
		{
			state.counters
				.filter(( counter: any ) => counter.valueMax - counter.valueNow > 5 )
				.map(( counter: any ) => <Counter key={ counter.position } data={ counter } /> )
		}		
		</div>

	</section>

</article>
)};