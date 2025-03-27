import React, { useState } from "react";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";

const ComposeModal = ({ onClose }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());


  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

 

  const handleSubmit=async (e) => {
    const receiver=e.get("receiver");
    const subject=e.get("subject");
    const plainText = editorState.getCurrentContent().getPlainText();
const token=localStorage.getItem("token")

  try {

    const response = await fetch("http://localhost:5000/mail/add", {
      method: "POST",
      headers: { "Content-Type": "application/json","Authorization":token },
      body: JSON.stringify({ 
        receiver,subject,message:plainText
      }),
      
  });

        onClose(); 
  
} catch (error) {
  console.log(error);
  
}

    
    
  }

  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
      onClick={handleOutsideClick}
    >
      <div
        className="bg-white w-1/2 p-6 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-2">Compose Email</h2>
        <form action={handleSubmit}>
          <input
            type="text"
            name="receiver"
            placeholder="To:"
            className="w-full border p-2 mb-2"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject:"
            className="w-full border p-2 mb-2"
          />

          {/* Toolbar */}
          <div className="flex gap-2 mb-2 border-b pb-2">
            <button
              type="button"
              className="px-2 py-1 rounded bg-gray-200"
              onClick={() => toggleInlineStyle("BOLD")}
            >
              B
            </button>
            <button
              type="button"
              className="px-2 py-1 rounded bg-gray-200"
              onClick={() => toggleInlineStyle("ITALIC")}
            >
              I
            </button>
            <button
              type="button"
              className="px-2 py-1 rounded bg-gray-200"
              onClick={() => toggleInlineStyle("UNDERLINE")}
            >
              U
            </button>
          </div>

         <div className="border border-gray-300 rounded-md p-2 min-h-[150px]">
            <Editor  editorState={editorState} onChange={setEditorState} />
          </div> 

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComposeModal;
