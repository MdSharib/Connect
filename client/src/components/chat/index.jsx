import React from "react";
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";
import Header from "@/components/customHeader";
import StandardMessageForm from "@/components/customMessageForms/StandardMessageForm";

const Chat = ({ user, secret }) => {
  const chatProps = useMultiChatLogic( //authenticating the user using chat engine
    import.meta.env.VITE_PROJECT_ID,
    user,
    secret
  );

  return (
    <div style={{ flexBasis: "100%" }}>
      {/* this socket helps us to authenticate to chat engine and the user by passing chatProps*/}
      <MultiChatSocket {...chatProps} /> 
      <MultiChatWindow
        {...chatProps}
        style={{ height: "100vh" }}
        // customising header of our chat app with inbuilt renderChatHeader from chat engine
        renderChatHeader={(chat) => <Header chat={chat} />}
        // customising chat input section of our chat app with inbuilt renderMessageForm from chat engin
        renderMessageForm={(props) => {
          

          return (
            <StandardMessageForm props={props} activeChat={chatProps.chat} />
          );
        }}
      />
    </div>
  );
};

export default Chat;
