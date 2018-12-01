import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './pages/categories/shared/Category';
import { Entry } from './pages/entries/shared/entry.model';

export class InMemoryDatabase implements InMemoryDbService {

    createDb() {
        const categories: Category[] = [
            { id: 1, name: 'Teste 1', description: 'blablabla'},
            { id: 2, name: 'Teste 2', description: 'blablabla'},
            { id: 3, name: 'Teste 3', description: 'blablabla'},
            { id: 4, name: 'Teste 4', description: 'blablabla'},
            { id: 5, name: 'Teste 5', description: 'blablabla'},
        ];

        const entries: Entry[] = [
            {
                id: 1,
                name: 'Teste 1',
                categoryId: categories[0].id,
                category: categories[0],
                paid: true,
                date: '14/10/2018',
                amount: '10',
                type: 'expense',
                description: 'hala hala hala hala'
            } as Entry,
            {
                id: 2,
                name: 'Teste 2',
                categoryId: categories[1].id,
                category: categories[1],
                paid: true,
                date: '14/10/2018',
                amount: '154',
                type: 'revenue'
            } as Entry,
            {
                id: 3,
                name: 'Teste 3',
                categoryId: categories[2].id,
                category: categories[2],
                paid: true,
                date: '14/10/2018',
                amount: '800',
                type: 'expense',
                description: 'hala hala hala hala'
            } as Entry,
            {
                id: 4,
                name: 'Teste 4',
                categoryId: categories[3].id,
                category: categories[3],
                paid: true,
                date: '14/10/2018',
                amount: '90',
                type: 'expense'
            } as Entry,
            {
                id: 5,
                name: 'Teste 5',
                categoryId: categories[4].id,
                category: categories[4],
                paid: true,
                date: '14/10/2018',
                amount: '1500',
                type: 'revenue',
                description: 'hala hala hala hala'
            } as Entry,
        ];

        return { categories, entries };
    }
}