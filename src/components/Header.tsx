// 必要なライブラリやコンポーネントをインポート
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "@react-spring/web";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const Header = () => {
  // 検索テキストを管理するための State
  const [searchText, setSearchText] = useState("");


  const router = useRouter();

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (searchText.trim()) {
      router.push(`/articles?search=${encodeURIComponent(searchText.trim())}`);
    }
  }
  // オフセットを管理するための State
  const [Logo_offset, setLogo_Offset] = useState({ x: 0, y: 0 });
  const [Dark_offset, setDark_Offset] = useState({ x: 0, y: 0 });

  // テーマを管理するためのフック
  const { theme, setTheme, resolvedTheme } = useTheme();

  // 表示されているテーマを管理するための State
  const [displayedTheme, setDisplayedTheme] = useState(null);

  // resolvedTheme が変更されたときに、displayedTheme を更新する
  useEffect(() => {
    setDisplayedTheme(resolvedTheme);
  }, [resolvedTheme]);

  // オフセットを計算するための関数
  const handleOffset = (e, clientX, clientY) => {
    const img = e.target;
    const rect = img.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    if (e.target.tagName == "IMG") {
      setLogo_Offset({ x: clientX - centerX, y: clientY - centerY });
    } else if (e.target.tagName == "svg") {
      setDark_Offset({ x: clientX - centerX, y: clientY - centerY });
    }
  };

  // アニメーションのプロパティを設定する
  const Logo_springProps = useSpring({
    transform: `translate(${Logo_offset.x}px, ${Logo_offset.y}px)`,
    config: { tension: 200, friction: 15 },
  });

  const Dark_springProps = useSpring({
    transform: `translate(${Dark_offset.x}px, ${Dark_offset.y}px)`,
    config: { tension: 200, friction: 15 },
  });

  // ヘッダーコンポーネントの描画
  return (
    <header className="bg-slate-300/30 w-full transition-all duration-500 ease-in-out transform hover:-translate-y-1 relative">
      <div className="px-5 py-4 max-w-5xl flex mx-auto items-center justify-center flex-col md:justify-between md:flex-row">
        {/* ロゴとサイトタイトル */}
        <div className="flex items-center">
          <Link href={"/"} className="hover:scale-125 transition-all">
            <animated.div
              className="sm:w-20 rounded-full w-16"
              style={Logo_springProps}
              onMouseMove={(e) => handleOffset(e, e.clientX, e.clientY)}
              onMouseLeave={() => setLogo_Offset({ x: 0, y: 0 })}
              onTouchMove={(e) =>
                handleOffset(e, e.touches[0].clientX, e.touches[0].clientY)
              }
              onTouchEnd={() => setLogo_Offset({ x: 0, y: 0 })}
            >
              <Image // Imageコンポーネントを追加
                src="/Ohana_logo.jpg"
                alt="Ohana Logo"
                width={64} // 画像の幅を設定
                height={64} // 画像の高さを設定
                quality={100} // 画像の品質を設定 (オプション)
                className="rounded-full"
              />
            </animated.div>
          </Link>
          <h1 className="text-2xl sm:text-3xl ml-3">Ohana 日記</h1>
        </div>
        {/* ナビゲーションリンクと検索バー */}
        <div className="flex mt-5 space-x-3 items-center">
          {/* About リンク */}
          <Link
            href={"/about"}
            className="group text-lg relative overflow-hidden cursor-pointer"
          >
            <span className="block z-10">About</span>
            <span className="block w-full h-1 bg-blue-500 absolute bottom-0 left-0 transform -translate-x-full transition-all duration-300 ease-in-out group-hover:translate-x-0"></span>
          </Link>
          {/* 検索フォーム */}
          <form
            className="flex items-center ml-5"
            onChange={handleSearchSubmit}
            onSubmit={handleSearchSubmit}
          >
            <input
              className="border block w-20 outline-none border-gray-300 rounded-md px-2 py-1 text-sm focus:w-48 focus:border-orange-500 transition-all"
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="px-2 ml-1 text-blue-500">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>

          {/* テーマ切り替えボタン */}
          {displayedTheme && (
            <animated.button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="w-10 bg-slate-950 rounded-full text-xl h-10 cursor-pointer"
              style={Dark_springProps}
              onMouseMove={(e) => handleOffset(e, e.clientX, e.clientY)}
              onMouseLeave={() => setDark_Offset({ x: 0, y: 0 })}
              onTouchMove={(e) =>
                handleOffset(e, e.touches[0].clientX, e.touches[0].clientY)
              }
              onTouchEnd={() => setDark_Offset({ x: 0, y: 0 })}
            >
              {displayedTheme === "light" ? (
                <FontAwesomeIcon icon={faMoon} style={{ color: "#f2f218" }} />
              ) : (
                <FontAwesomeIcon icon={faSun} style={{ color: "#ffa50a" }} />
              )}
            </animated.button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
