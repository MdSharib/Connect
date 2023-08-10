import {
  PaperAirplaneIcon,
  PaperClipIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import Dropzone from "react-dropzone";


// this is a resuable components for ai and standard text messages. that why hmhe jo b particular functionality alg chahye wo hm props me lere h
const MessageFormUI = ({
  setAttachment,
  message,
  handleChange,
  handleSubmit,
  appendText,
  handleKeyDown,
}) => {
  const [preview, setPreview] = useState("");

  return (
    <div className="message-form-container">
      {preview && ( //if preview true, then show img preview
        <div className="message-form-preview">
          <img
            alt="message-form-preview"
            className="message-form-preview-image"
            src={preview}
            onLoad={() => URL.revokeObjectURL(preview)} //to display the img
          />
          <XMarkIcon //cross icon
            className="message-form-icon-x"
            onClick={() => { //making null all values
              setPreview("");
              setAttachment("");
            }}
          />
        </div>
      )}
      {/* write message field */}
      <div className="message-form"> 
        <div className="message-form-input-container">
          <input
            className="message-form-input"
            type="text"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
          />
          {appendText && (
            <input
              className="message-form-assist"
              type="text"
              disabled="disabled"
              value={`${message} ${appendText}`}
            />
          )}
        </div>
        <div className="message-form-icons">
          <Dropzone  //img send icon with dropzone pckg
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            noClick={true}
            onDrop={(acceptedFiles) => { //onDrop means when the img is uploaded and we get that image in accepted files
              setAttachment(acceptedFiles[0]);
              setPreview(URL.createObjectURL(acceptedFiles[0]));
            }}
          >
            {({ getRootProps, getInputProps, open }) => ( // this is default syntax with dropzone pckg
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <PaperClipIcon
                  className="message-form-icon-clip"
                  onClick={open}
                />
              </div>
            )}
          </Dropzone>

          <hr className="vertical-line" />
          <PaperAirplaneIcon
            className="message-form-icon-airplane"
            onClick={() => {
              setPreview("");
              handleSubmit();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageFormUI;
