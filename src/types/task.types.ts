enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  DONE = "done",
}

type Task = {
  id: string;
  description: string;
  status: TaskStatus;
  created_at: number;
  updated_at: number | null;
};

export { TaskStatus, type Task };
