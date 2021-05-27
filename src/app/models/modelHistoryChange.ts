import {ModelTypeChange} from '@src/app/models/modelTypeChange';

export class ModelHistoryChange {
    dateChange:string;
    descriptionChange: string;
    id: number;
    typeChange: ModelTypeChange;
    usersDataId:number;
}
