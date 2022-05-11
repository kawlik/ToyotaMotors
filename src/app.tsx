import Counters from './components/counters';
import Infobar from './components/infobar';

import AppProvider from './contexts/app.context';


/*	Component Logic
/*	*	*	*	*	*	*	*	*	*	*/
export default function App() {


/*	Component Layout
/*	*	*	*	*	*	*	*	*	*	*/
return (
<AppProvider>

	<Infobar />

	<Counters />
	
</AppProvider>
)};