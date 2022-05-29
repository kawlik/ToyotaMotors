import { useState } from 'react';
import { useAppContext } from '../contexts/app.context';
import { AppActions } from '../contexts/dto';


/*	Component Logic
/*  *	*	*	*	*	*	*	*	*	*/
export default function Config( prop: {
    close(): void
}) {

    //  get context state
    const { state, dispatch, setStore } = useAppContext();

    //  create local state
    const [ valueWarn, setValueWarn ] = useState( state.config.valueWarn );
    const [ valueStop, setValueStop ] = useState( state.config.valueStop );
    const [ normal, setNormal ] = useState( state.config.style['normal'] );
    const [ urgent, setUrgent ] = useState( state.config.style['urgent'] );
    const [ stoped, setStoped ] = useState( state.config.style['stoped'] );


/*	Component Layout
/*	*	*	*	*	*	*	*	*	*	*/
return (
<aside className='config shadow p-2' >
<div className='modal-content' >

    <div className='modal-header border-bottom-0' >
        <h5 className='modal-title display-6'>Config</h5>
        <button className='btn-close' onClick={ () => prop.close() } />
    </div>  

    <div className='modal-body' >

        <div className='col-12 mb-3' >
            <label className='form-label'>Is Urgent at: <strong>{ valueWarn }</strong></label>
            <input className='form-range' type='range' value={valueWarn} min={1} max={10} onChange={ e => setValueWarn( +e.target.value ) } />
        </div>

        <div className='col-12 mb-3' >
            <label className='form-label'>Is Stoped at: <strong>{ valueStop }</strong></label>
            <input className='form-range' type='range' value={valueStop} min={0} max={10} onChange={ e => setValueStop( +e.target.value ) } />
        </div>

        <div className='row g-3' >

            <div className='col-4' >
                <label className='form-label' ><span className={ `text-${ normal }` }>Normal:</span></label>
                <select className='form-select' value={normal} onChange={ e => setNormal( e.target.value ) } >
                    <option value='primary' >Blue</option>
                    <option value='info' >Azure</option>
                    <option value='success' >Green</option>
                    <option value='warning' >Yellow</option>
                    <option value='danger' >Red</option>
                    <option value='light' >Light</option>
                    <option value='secondary' >Grey</option>
                    <option value='dark' >Dark</option>
                </select>
            </div>

            <div className='col-4' >
                <label className='form-label' ><span className={ `text-${ urgent }` }>Urgent:</span></label>
                <select className='form-select' value={urgent} onChange={ e => setUrgent( e.target.value ) } >
                    <option value='primary' >Blue</option>
                    <option value='info' >Azure</option>
                    <option value='success' >Green</option>
                    <option value='warning' >Yellow</option>
                    <option value='danger' >Red</option>
                    <option value='light' >Light</option>
                    <option value='secondary' >Grey</option>
                    <option value='dark' >Dark</option>
                </select>
            </div>

            <div className='col-4' >
                <label className='form-label' ><span className={ `text-${ stoped }` }>Stoped:</span></label>
                <select className='form-select' value={stoped} onChange={ e => setStoped( e.target.value ) } >
                    <option value='primary' >Blue</option>
                    <option value='info' >Azure</option>
                    <option value='success' >Green</option>
                    <option value='warning' >Yellow</option>
                    <option value='danger' >Red</option>
                    <option value='light' >Light</option>
                    <option value='secondary' >Grey</option>
                    <option value='dark' >Dark</option>
                </select>
            </div>

        </div>

    </div>

    <div className='modal-footer border-top-0' >

        <button className='btn btn-lg btn-outline-warning' onClick={ e => {
            e.preventDefault();

            //  dispatch new state
            dispatch({ action: AppActions.UPDATE, payload: {
                    ...state,
                    config: {
                        valueWarn: 5,
                        valueStop: 1,
                        style: {
                            'normal': 'primary',
                            'urgent': 'warning',
                            'stoped': 'danger',
                        }
                    }
                }
            });

            //  save to local storage
            setStore( null );

            //  close modal
            prop.close();
            
        }} >Clear</button>

        <button className='btn btn-lg btn-outline-primary' onClick={ e => {
            e.preventDefault();

            //  dispatch new state
            dispatch({ action: AppActions.UPDATE, payload: {
                    ...state,
                    config: {
                        valueWarn: valueWarn,
                        valueStop: valueStop,
                        style: {
                            'normal': normal,
                            'urgent': urgent,
                            'stoped': stoped,
                        }
                    }
                }
            });

            //  save to local storage
            setStore({
                valueWarn: valueWarn,
                valueStop: valueStop,
                style: {
                    'normal': normal,
                    'urgent': urgent,
                    'stoped': stoped,
                }
            });

            //  close modal
            prop.close();

        }} >Save</button>

    </div>

</div>
</aside>
)};