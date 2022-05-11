import { registerSW } from 'virtual:pwa-register';


/*  Mutable data with refrence
/*   *   *   *   *   *   *   *   *   *   */
let installPWA: any;
let registersw = registerSW({
    onNeedRefresh() { },
    onOfflineReady() { },
});


/*  Define services
/*   *   *   *   *   *   *   *   *   *   */
export const installPrompt = ( async function(): Promise<any> {
    return new Promise(( resolve ) => installPWA
    ? resolve( installPWA )
    : window.addEventListener( 'beforeinstallprompt', ( event ) => {

        //  prevent default fire
        event.preventDefault();

        //  catch event
        installPWA = event;

        //  resolve promise
        resolve( installPWA );
    }));
}());