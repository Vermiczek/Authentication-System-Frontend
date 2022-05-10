import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUserContext, useUserUpdateContext } from "./ContextProvider";

const Home: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const User = useUserContext();
  const setUser = useUserUpdateContext();

  useEffect(() => {
    if (User == null) {
      fetch("http://localhost:3001/logout", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      router.push("/");
    }
  }, [User, router]);

  return (
    <>
      <div
        onClick={() => {
          setUser(null);
        }}
      >
        Log out
      </div>
      <div
        onClick={() => {
          router.push("/rooms/1");
        }}
      >
        Welcome {User}!
      </div>
    </>
  );
};

export default Home;
