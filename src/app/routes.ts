import { createBrowserRouter } from "react-router";
import { CaptureScreen } from "./screens/CaptureScreen";
import { RecordingScreen } from "./screens/RecordingScreen";
import { NoteScreen } from "./screens/NoteScreen";
import { ResultsScreen } from "./screens/ResultsScreen";
import { ExpandedView } from "./screens/ExpandedView";
import { TasksScreen } from "./screens/TasksScreen";
import { PlaybookScreen } from "./screens/PlaybookScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: CaptureScreen,
  },
  {
    path: "/recording",
    Component: RecordingScreen,
  },
  {
    path: "/note",
    Component: NoteScreen,
  },
  {
    path: "/results",
    Component: ResultsScreen,
  },
  {
    path: "/expanded/:id",
    Component: ExpandedView,
  },
  {
    path: "/tasks",
    Component: TasksScreen,
  },
  {
    path: "/playbook",
    Component: PlaybookScreen,
  },
]);