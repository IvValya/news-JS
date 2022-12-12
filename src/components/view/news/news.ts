import './news.css';
import { Articles } from '../../../index';
class News {
    draw(data: Articles[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp')!;
        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;
            if (newsClone !== null) {
                if (idx % 2) newsClone.querySelector<HTMLDivElement>('.news__item')!.classList.add('alt');
                newsClone.querySelector<HTMLDivElement>('.news__meta-photo')!.style.backgroundImage = `url(${
                    item.urlToImage || 'img/news_placeholder.jpg'
                })`;
                (newsClone.querySelector('.news__meta-author') as HTMLElement).textContent =
                    item.author || item.source.name;
                (newsClone.querySelector('.news__meta-date') as HTMLElement).textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');
                newsClone.querySelector<HTMLTitleElement>('.news__description-title')!.textContent = item.title;
                newsClone.querySelector<HTMLTitleElement>('.news__description-source')!.textContent = item.source.name;
                newsClone.querySelector<HTMLParagraphElement>('.news__description-content')!.textContent =
                    item.description;
                newsClone.querySelector<HTMLParagraphElement>('.news__read-more a')!.setAttribute('href', item.url);

                fragment.append(newsClone);
            }
        });

        document.querySelector<HTMLElement>('.news')!.innerHTML = '';
        document.querySelector<HTMLElement>('.news')!.appendChild(fragment);
    }
}

export default News;
