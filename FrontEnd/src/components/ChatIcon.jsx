import React, { useEffect, useState } from 'react';

export default function ChatIcon({ data, onChatIconClick,active}) {
    const [userinfo, setUserInfo] = useState();
    const [subname, setSubname] = useState("");
    const [otherMember, setOtherMember] = useState();
    const [Active,setActive]=useState(false)

    const getUserInfo = async () => {
        console.log(data);
        for (let index = 0; index < 2; index++) {
            console.log("called", data.members[index]);
            if (localStorage.getItem('token') !== data.members[index]) {
                setOtherMember(data.members[index]);
                break;
            }
        }

        const response = await fetch(`/api/user?id=${String(otherMember)}`, {
            method: "GET",
        });

        const responsedata = await response.json();
        console.log(responsedata);
        setUserInfo(responsedata);
       
        setSubname(responsedata.Name.substring(0, 2));
    };

   
    useEffect(() => {
        getUserInfo();
    }, [data]);

    // Function to handle chat icon click
    const handleClick = () => {
        setActive(true)
        onChatIconClick(data._id);
    };

    return (
        <>
        {/* {
            Active ?(
<div className=" bg-slate-400 shadow-xl p-4 flex justify-center gap-3 items-center rounded-md" onClick={handleClick}>
                {userinfo ? (
                    <>
                        <div className="left">
                            <img src={`https://ui-avatars.com/api/?format=svg&name=${subname}`} alt="" className='h-[80px] w-[80px] rounded-full' />
                        </div>
                        <div className="right">
                            <p className='text-lg font-semibold'>{userinfo.Name}</p>
                        </div>
                    </>
                ) : (
                    <div className="">Loading...</div>
                )}
            </div>
            ):(
<div className="shadow bg-slate-100 p-4 flex justify-center gap-3 items-center rounded-md" onClick={handleClick}>
                {userinfo ? (
                    <>
                        <div className="left">
                            <img src={`https://ui-avatars.com/api/?format=svg&name=${subname}`} alt="" className='h-[80px] w-[80px] rounded-full' />
                        </div>
                        <div className="right">
                            <p className='text-lg font-semibold'>{userinfo.Name}</p>
                        </div>
                    </>
                ) : (
                    <div className="">Loading...</div>
                )}
            </div>
            )
        } */}
        <div className={`${active} shadow-xl p-4 flex justify-center gap-3 items-center rounded-md`}  onClick={handleClick}>
                {userinfo ? (
                    <>
                        <div className="left">
                            <img src={`https://ui-avatars.com/api/?format=svg&name=${subname}`} alt="" className='h-[80px] w-[80px] rounded-full' />
                        </div>
                        <div className="right">
                            <p className='text-lg font-semibold'>{userinfo.Name}</p>
                        </div>
                    </>
                ) : (
                    <div className="">Loading...</div>
                )}
            </div>

            
        </>
    );
}
