import { v4 as uuidv4 } from 'uuid';

interface ITask {
  id?: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string;
}
class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string;

  columnId: string;

  constructor(props: ITask) {
    this.id = uuidv4();
    this.title = props.title;
    this.order = props.order;
    this.description = props.description;
    this.userId = props.userId;
    this.boardId = props.boardId;
    this.columnId = props.columnId;
  }
}
export default Task;
