import React from "react";
// Import CKEditor and ClassicEditor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const BlogContentInput = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Content <span className="text-red-500">*</span>
      </label>

      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(event, editor) => {
          const data = editor.getData();
          // pass to parent onChange with synthetic event shape
          onChange({ target: { name: "content", value: data } });
        }}
        onReady={(editor) => {
          // you can do something when editor is ready
          console.log("Editor is ready to use!", editor);
        }}
        config={{
          placeholder: "Write your blog content here...",
        }}
      />
    </div>
  );
};

export default BlogContentInput;
