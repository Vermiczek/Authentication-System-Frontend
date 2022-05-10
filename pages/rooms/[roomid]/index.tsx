import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useUserContext, useUserUpdateContext } from "../../ContextProvider";
import { useRouter } from "next/router";


const Home = () => {
  const [message, setMessage] = useState("");
  const user = useUserContext();
  const router = useRouter();
  const { roomid } = router.query;

  return (
    <>
      <InputText id={roomid} />
      <MessageBoard id={roomid} />
      <div>UWU {roomid}</div>
    </>
  );
};

const MessageBoard = (id: any) => {
  const [data, setData] = useState<any[]>([]);
  const [mapState, setMap] = useState<any>(false);




  useEffect(() => {
    setMap(
      data.map((msg) => {
        return (
          <Message
            key={1}
            text={msg.text}
            createdat={msg.timestamp}
            userid={msg.userID}
          />
        );
      })
    );
    console.log(data);
  }, []);

  

  return <div>{mapState}</div>;
};

interface MessageProps {
  text: string;
  createdat: number;
  userid: string;
}

const Message = ({ text, createdat, userid }: MessageProps) => {
  const [textx, setText] = useState<string>();
  const [uidx, setUid] = useState<string>();
  const [createdatx, setcreatedat] = useState<string>();
  useEffect(() => {
    setText(text);
    setUid(userid);
  }, [text, userid, createdat]);
  return (
    <div>
      <div></div>
      <div></div>
      <div>{textx}</div>
    </div>
  );
};

const InputText = (id: any) => {
  const [message, setMessage] = useState("");
  const user = useUserContext();

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />

      <div
        onClick={() => {
          console.log(id.id);
        }}
      >
        XDD
      </div>
    </>
  );
};

export default Home;
