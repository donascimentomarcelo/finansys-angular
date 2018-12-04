import { Category } from './../../categories/shared/Category';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Entry extends BaseResourceModel {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public type?: string,
        public amount?: string,
        public date?: string,
        public paid?: boolean,
        public categoryId?: number,
        public category?: Category,
    ) {
        super();
    }

    static types = {
        expense: 'Despensa',
        revenue: 'Receita'
    };

    get paidText(): string {
        return this.paid ? 'Pago' : 'Pendente';
    }
}
