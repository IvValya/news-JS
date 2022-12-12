import './news.css';
import { Articles } from '../../../index';
class News {
    draw(data: Articles[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;
        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;
            if (newsClone!==null){
                    if (idx % 2 ) (newsClone.querySelector('.news__item') as HTMLDivElement).classList.add('alt');
                newsClone.querySelector<HTMLDivElement>('.news__meta-photo')!.style.backgroundImage = `url(${
                    item.urlToImage || 'img/news_placeholder.jpg'
                })`;
                (newsClone.querySelector('.news__meta-author') as HTMLElement).textContent = item.author || item.source.name;
                (newsClone.querySelector('.news__meta-date')  as HTMLElement).textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');
                newsClone.querySelector<HTMLTitleElement>('.news__description-title')!.textContent = item.title;
                newsClone.querySelector<HTMLTitleElement>('.news__description-source')!.textContent = item.source.name;
                newsClone.querySelector<HTMLParagraphElement>('.news__description-content')!.textContent = item.description;
                newsClone.querySelector<HTMLParagraphElement>('.news__read-more a')!.setAttribute('href', item.url);

                fragment.append(newsClone);
            }
           
        });

        (document.querySelector('.news') as HTMLElement).innerHTML = '';
        (document.querySelector('.news') as HTMLElement).appendChild(fragment);
    }
}

export default News;
