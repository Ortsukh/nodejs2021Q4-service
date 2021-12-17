import { v4 as uuidv4 } from 'uuid';

interface IColumn {
  id: string;
  title: string;
  order: number;
}
 interface IBoard {
  id?: string;
  title: string;
  columns?: IColumn[];
}
/**
 * 
 * @param columns array of columns this board params
 * @returns return array of columns with own id
 */
function initColumns(columns:IColumn[] | undefined) {
  if(Array.isArray(columns) && columns !== undefined) {
    return columns.map((column: IColumn )=> {
      const id:string = uuidv4();
      const newColumn: IColumn = {...column, id };
      return newColumn;
    });
  }
return []
}
class Board {
  id: string;

  title: string;

  columns: IColumn[] ;

  constructor(props:IBoard){
    this.id = uuidv4();
    this.title = props.title;
    this.columns = initColumns(props.columns);
  }


}

export default Board;
