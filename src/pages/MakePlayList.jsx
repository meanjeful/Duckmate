import React, { useState } from "react";
import UrlList from "../components/UrlList";
import {
  ClipboardDocumentIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const MakePlayList = () => {
  const [url, setUrl] = useState("");
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [result, setResult] = useState("");

  const addUrl = () => {
    if (valdiateUrl(url) === true) {
      let copy = [...list];
      copy.unshift(url);
      setList(copy);
    }
  };

  const valdiateUrl = (url) => {
    const startIdx = url.lastIndexOf("/v/");
    if (startIdx === -1) {
      toast("주소를 확인해주세요");
      return false;
    }
    return true;
  };

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("클립보드에 복사되었습니다.");
    } catch (error) {
      toast("error");
    }
  };

  const handlePasteClipBoard = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      console.log(clipboardText);
      if (valdiateUrl(clipboardText) === true) {
        let copy = [...list];
        copy.unshift(clipboardText);
        setList(copy);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createShortenResult = async (resultUrl) => {
    try {
      // const ShortenResult = await axios({
      //   method: "POST",
      //   url: "https://api-ssl.bitly.com/v4/shorten",
      //   headers: {
      //     Authorization: `Bearer fbea5fe89ba4d01d11cf4ee5fed5abbeb5280eed`,
      //     "Content-Type": "application/json",
      //   },
      //   data: JSON.stringify({
      //     long_url: resultUrl,
      //     domain: "bit.ly",
      //   }),
      // });
      const ShortenResult = await axios({
        method: "POST",
        url: "https://openapi.naver.com/v1/util/shorturl.json",
        headers: {
          "Content-Type": "application/json",
          "X-Naver-Client-Id": "pmDXGch0YcYWbRSnLg3P",
          "X-Naver-Client-Secret": "hAvIL1bbps",
          "Access-Control-Allow-Origin": "*",
        },
        data: JSON.stringify({
          url: resultUrl,
        }),
      });
      console.log(ShortenResult);
    } catch (error) {
      console.log(error);
    }
  };

  const translateUrl = () => {
    const numberArr = [];

    for (let i in list) {
      const startIdx = list[i].lastIndexOf("/v/");
      const endIdx = list[i].indexOf("/list");

      if (startIdx !== -1 && endIdx === -1) {
        const urlNumber = list[i].substring(startIdx + 3);
        numberArr.push(urlNumber);
      } else if (endIdx !== -1) {
        const urlNumber = list[i].substring(startIdx + 3, endIdx);
        numberArr.push(urlNumber);
      }
    }

    const mergedUrl = `https://tv.naver.com/v/${
      numberArr[0]
    }?plClips=false:${numberArr.join(":")}&query=${title}`;

    const resultUrl = mergedUrl.replace(" ", "");

    setResult(resultUrl);
    createShortenResult(resultUrl);
  };

  return (
    <>
      <div className="flex flex-col items-center py-4 gap-2 bg-ivory h-screen w-screen">
        <div className="font-hbios text-2xl text-black py-4">
          네이버 재생목록 생성기
        </div>
        <div className="flex gap-2">
          <div className="font-hbios text-black text-xl">재생목록 제목 : </div>
          <input
            type="text"
            className="font-hbios border-b-2 text-center border-black bg-ivory w-[20rem]"
            value={title}
            placeholder="재생목록 제목을 입력하세요."
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
        </div>
        <div className="flex gap-2">
          <div className="font-hbios text-black text-lg">동영상 URL : </div>
          <input
            type="text"
            className="font-hbios border-b-2 text-center border-black bg-ivory w-[30rem]"
            value={url}
            placeholder="url"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          ></input>
          <button
            className="font-hbios text-ivory bg-black w-12 rounded-md"
            onClick={() => {
              setUrl("");
              addUrl();
            }}
          >
            추가
          </button>
          <button
            className="font-hbios"
            onClick={() => {
              handlePasteClipBoard();
            }}
          >
            <div className="w-8 h-8 bg-orange flex items-center justify-center rounded-md">
              <ClipboardDocumentListIcon className="w-6 h-6 text-ivory" />
            </div>
          </button>
        </div>
        {list.map(function (item, index) {
          return (
            <div key={index}>
              <UrlList url={item} />
            </div>
          );
        })}
        <div>{result}</div>
        <div className="flex gap-2">
          <button
            className="font-hbios text-ivory bg-black w-[10rem] h-10 rounded-md text-lg"
            onClick={async () => {
              translateUrl();
            }}
          >
            재생목록 생성
          </button>
          <button
            onClick={() => {
              handleCopyClipBoard(result);
            }}
          >
            <div className="w-[8rem] h-10 bg-orange flex items-center justify-center rounded-md gap-2">
              <ClipboardDocumentIcon className="w-7 h-7 text-ivory" />
              <div className="font-hbios text-ivory text-lg">복사하기</div>
            </div>
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default MakePlayList;
