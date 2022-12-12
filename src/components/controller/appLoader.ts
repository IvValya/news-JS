import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.up.railway.app/', {
            apiKey: '2b0c1a3e6eb74a5091eb5695b9ad6404', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
