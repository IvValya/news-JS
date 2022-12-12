import { DataNews } from '../../index';
import { DataSources } from '../../index';

//type Callback = (data?: DataNews | DataSources) => void;
//type Callback = <T>(data?: T) => void;
interface Callback {
    (data?: DataNews | DataSources):void
} ;

class Loader {
    readonly baseLink: string;    
    options?: object;
    constructor(baseLink: string, options?: object) {
        this.baseLink = baseLink;
        this.options = options;
    }
    getResp(
        { endpoint, options = {} }: {endpoint: string, options?: object},
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }
    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }
        return res;
    }

    makeUrl(options: object, endpoint: string) {
        const urlOptions: {[index: string]: string} = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;
        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });
        return url.slice(0, -1);
    }
    
    load(method: string, endpoint: string, callback: Callback, options: object) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err: Response) => console.error(err));
    }
}

export default Loader;
