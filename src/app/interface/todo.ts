import {ITag} from './tag';
import {ICategory} from './category';

export interface ITodo{
    _id:string,
    title:string,
    isCompleted:boolean,
    targetDate:string,
    tags: ITag[],
    category: ICategory

}

