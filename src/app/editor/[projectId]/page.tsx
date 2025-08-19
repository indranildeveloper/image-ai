import { FC } from "react";
import Editor from "@/features/editor/components/Editor";
import { protectServer } from "@/features/auth/utils/utils";

const EditorProjectIdPage: FC = async () => {
  await protectServer();

  return (
    <div>
      <Editor />
    </div>
  );
};

export default EditorProjectIdPage;
