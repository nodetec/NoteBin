"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BsLightningChargeFill } from "react-icons/bs";
import { GiOstrich } from "react-icons/gi";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";
import { TbNote } from "react-icons/tb";
import { IoMdCloseCircleOutline } from "react-icons/io"

import Button from "./Button";
import Buttons from "./Buttons";
import TextInput from "./TextInput";

export default function Header({ onSetUser }: any) {
  // const [user, setUser] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [keys, setKeys] = useState({ private: "", public: "" });
  const [isLightningConnected, setIsLightningConnected] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const connected = sessionStorage.getItem("connected");

    const getConnected = async (connected: string) => {
      let enabled = false;
      if (connected === "true") {
        // @ts-ignore
        enabled = await window.webln.enable();
        setIsLightningConnected(true);
      }
      return enabled;
    };

    if (connected) {
      getConnected(connected);
    }
  }, []);

  function handleClick() {
    onSetUser("chris");
    setIsOpen(true);
  }

  const connectLightningHandler = async () => {
    // @ts-ignore
    if (typeof window.webln !== "undefined") {
      // @ts-ignore
      const enabled = await window.webln.enable();

      sessionStorage.setItem("connected", "true");
    }
    console.log("connected");
    setIsLightningConnected(true);
  };

  const { systemTheme, theme, setTheme } = useTheme();
  const isDarkTheme = (theme === "system" ? systemTheme : theme) === "dark";

  const toggleTheme = () => {
    if ( isDarkTheme  ) {
      setTheme("light");
      document.documentElement.setAttribute('data-color-mode', 'light')
    } else {
      setTheme("dark");
      document.documentElement.setAttribute('data-color-mode', 'dark')
    }
  }

  const renderThemeChanger = () => {
    if (!mounted) return null;

    return (
      <Button
        onClick={toggleTheme}
        icon={isDarkTheme ?
          <HiOutlineSun className="w-6 h-6 text-zinc-200" /> :
          <HiOutlineMoon className="w-6 h-6 text-neutral-800" />}
        size="sm"
        color="transparent"
      />
    )
  };

  return (
    <div>
      <nav className="flex justify-between items-center pb-12">
        <Link className="text-3xl font-bold dark:text-zinc-200 text-neutral-800" href="/">
          <div className="flex flex-row">
            <TbNote
              className="text-neutral-800 dark:text-zinc-200"
              size="40"
            />
            <span className="dark:text-zinc-200 text-neutral-800 ml-1">note</span>
            <span className="text-blue-400">bin</span>
          </div>
        </Link>
        <div className="flex gap-4 flex-row">
          {renderThemeChanger()}
          {/* <Link href="/"> */}
          <Button
            color="neutralLight"
            onClick={handleClick}
            size="sm"
            icon={
              <GiOstrich
                // color={"#111"}
                size="14"
              />
            }
          >
            login
          </Button>
          {/* <Button onClick={() => setIsOpen(true)}>Open Popup</Button> */}
          <Button
            onClick={connectLightningHandler}
            color="yellow"
            size="sm"
            icon={
              <BsLightningChargeFill
                // color={"#111"}
                size="14"
              />
            }
          >
            {isLightningConnected ? "connected" : "connect"}
          </Button>
        </div>
      </nav>
      {isOpen && (
        <>
          <div className="z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm border-2 dark:border-neutral-700 border-zinc-300 rounded-md shadow-overlay">
            <Button
              icon={<IoMdCloseCircleOutline size={24} />}
              className="absolute w-fit right-0 top-0 text-neutral-700 dark:text-zinc-300"
              onClick={() => setIsOpen(false)}
              color="transparent"
            />
            <div className="dark:bg-neutral-900 bg-zinc-100 flex flex-col justify-center items-stretch gap-4 p-6 shadow-lg ">
              <h3 className="text-xl text-neutral-700 dark:text-zinc-300 text-center pb-4">Generate Keys</h3>
              <TextInput value={keys.private} onChange={(e) => setKeys(current => ({ ...current, private: e.target.value }))} label="Private Key" />
              <TextInput value={keys.public} onChange={(e) => setKeys(current => ({ ...current, public: e.target.value }))} label="Pubilc Key" />
              <Buttons>
                <Button color="neutralDark" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsOpen(false)}>Generate</Button>
              </Buttons>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
