import AppLoader from './appLoader';
import { DataNews } from '../../index';
import { DataSources } from '../../index';
//type Callback = (data?: DataNews | DataSources) => void;
interface CallbackN {
    (data?: DataNews):void
} 
interface CallbackS {
    (data?: DataSources):void
} 

class AppController extends AppLoader {
    getSources(callback: CallbackS) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: CallbackN) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId!);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
