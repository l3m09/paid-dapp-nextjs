
export class Sessions {
    private static _timeout: boolean = false;
    public static ms: number = 20000;
    private static _timeoutCall = () => setTimeout(() => { 
        Sessions._timeout = false;
    }, 20000);

    public static setTimeoutCall = () => {
        Sessions._timeout = false;
        Sessions._timeoutCall();
    }

    public static getTimeoutBool = () => {
        return Sessions._timeout;
    }
}