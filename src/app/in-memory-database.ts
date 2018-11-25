import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './pages/categories/shared/Category';

export class InMemoryDatabase implements InMemoryDbService {

    createDb() {
        const categories: Category[] = [
            { id: 1, name: 'Teste 1', description: 'blablabla'},
            { id: 2, name: 'Teste 2', description: 'blablabla'},
            { id: 3, name: 'Teste 3', description: 'blablabla'},
            { id: 4, name: 'Teste 4', description: 'blablabla'},
            { id: 5, name: 'Teste 5', description: 'blablabla'},
        ];

        return { categories };
    }
}