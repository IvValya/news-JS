import './sources.css';
import { Source } from '../../../index';
class Sources {
    draw(data: Source[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp')!;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            sourceClone.querySelector<HTMLSpanElement>('.source__item-name')!.textContent = item.name;
            sourceClone.querySelector<HTMLDivElement>('.source__item')!.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector<HTMLElement>('.sources')!.append(fragment);
    }
}

export default Sources;
