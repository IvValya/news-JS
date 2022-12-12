import App from './components/app/app';
import './global.css';

export interface Articles {
    source: {
        id: string,
        name: string
    }
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string
}
export interface Source {
    id: string,
    name: string,
    description: string,
    url: string,
    category: string,
    language: string,
    country: string 
}
export interface DataNews {
    status: string,
    totalResults: number,
    articles: Articles[]
}
export interface DataSources {
    status: string,
    sources: Source[]
}

const app = new App();
app.start();
