import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { DataNews } from '../../index';
import { DataSources } from '../../index';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sourcesData = document.querySelector('.sources') as HTMLElement;
        sourcesData.addEventListener('click', (e: Event) => this.controller.getNews(e, (data: DataNews) => this.view.drawNews(dataЪ)));
        this.controller.getSources((data: DataSources) => this.view.drawSources(data));
    }
}

export default App;
