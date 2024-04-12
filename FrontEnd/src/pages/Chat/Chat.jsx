import React, { useEffect, useState } from 'react';
import './Chat.css';
import Navbar from '../../components/Navbar';
import ChatIcon from '../../components/ChatIcon';

export default function Chat() {
    const [chats, setChats] = useState([]);
    const [chatId, setChatId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const sendMessage=async()=>{
      const sendmsg=await fetch("/api/message",{
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({chatId,senderId:localStorage.getItem("token"),text:inputValue})

      })

      const data=await sendmsg.json();
      console.log(data);
    }

    const handleSubmit = (event) => {
      
        if(inputValue === '') return alert("please type something");
        sendMessage()

    };

    const handleChatIconClick = (chatId) => {
        setChatId(chatId);
    };

    const getMessages = async () => {
        if (chatId == null) {
            setChatId(chats[0]?._id);
        }

        const response = await fetch(`/api/message/get?chatId=${chatId}`, {
            method: 'GET',
        });

        const data = await response.json();
        console.log('this is message', data);
        setMessages(data);
    };

    useEffect(() => {
        getMessages();
    }, [chatId, chats]);

    const getChat = async () => {
        const response = await fetch(`/api/chat?userId=${localStorage.getItem('token')}`);
        const data = await response.json();
        console.log('this is data', data);
        setChats(data);
    };

    useEffect(() => {
        getChat();
    }, []);

    return (
        <div className="chat h-[100vh] overflow-clip">
            <Navbar />

            <h1 className="text-2xl p-3 text-center font-bold tracking-tight text-gray-900 sm:text-3xl">
                Your Chats
            </h1>

            <div className="flex h-[91.5vh] w-[100%]">
                <div className="left flex flex-col p-3 overflow-scroll h-full gap-4 w-[30%] bg-slate-600">
                    {chats.map((chat,index) => (
                        <ChatIcon data={chat} key={chat._id} active={chatId==chat._id?"bg-slate-500":"bg-slate-100"} onChatIconClick={handleChatIconClick}  />
                    ))}
                </div>
                <div className="right bg-slate-400 relative h-full flex flex-col w-[70%]">
                    <p className="text-2xl shadow-lg text-center font-bold p-3">Conversation with user 22</p>

                    <div className="messageContainer mt-3 no-scrollbar h-[90%] overflow-scroll  flex flex-col gap-3">
                        {messages.length > 0 ? (
                            messages.map((msg, index) => (
                                <p
                                    key={index}
                                    className={`p-3  w-fit text-lg ${
                                        msg.senderId === localStorage.getItem('token') ? 'bg-green-400 self-end' : 'bg-blue-400 self-start'
                                    }`}
                                >
                                    {msg.text}
                                </p>
                            ))
                        ) : (
                            <p>No messages</p>
                        )}
                    </div>

                    <div className="flex absolute bottom-[80px] z-99 w-full items-center self-end px-5 justify-self-end space-x-2">
                    <input
                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Type your message"
                    value={inputValue}
                    onChange={handleChange}
                />
                        <button
                        onClick={handleSubmit}
                            type="button"
                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
