import AppLoader from './appLoader';
import { DataNews } from '../../index';
import { DataSources } from '../../index';
interface Callback<T> {
    (data?: T): void;
}
/*
interface CallbackNews {
    (data?: DataNews): void;
}
interface CallbackSource {
    (data?: DataSources): void;
}
*/
class AppController extends AppLoader {
    getSources(callback: Callback<DataSources>) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: Callback<DataNews>) {
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
