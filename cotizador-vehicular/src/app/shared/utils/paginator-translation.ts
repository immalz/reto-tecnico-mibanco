import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";

@Injectable ()
export class PaginatorTranlation extends MatPaginatorIntl {

    constructor() {
        super();
    }

    override itemsPerPageLabel = 'Elementos por página';

    override getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (!length) {
            return `0 de ${length}`;
        }

        const firstItemPage = page * pageSize + 1;
        const lastItemPage = Math.min((page + 1) * pageSize, length);

        const showingRows = `${firstItemPage} - ${lastItemPage} de ${length}`;

        return `${showingRows}`;
    }
}