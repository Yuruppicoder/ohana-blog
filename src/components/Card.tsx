"use client";
import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import Image from "next/image";

const Card = ({ image, header, content }) => {
  // オフセットを管理するための State
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // オフセットを計算するための関数
  const handleOffset = (e, clientX, clientY) => {
    const img = e.target;
    const rect = img.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setOffset({ x: clientX - centerX, y: clientY - centerY });
  };

  // アニメーションのプロパティを設定する
  const springProps = useSpring({
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    config: { tension: 10, friction: 10 },
  });

  const [hover, setHover] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const handleTouchMove = (e) => {
    if (!hover) {
      setHover(true);
    }
    const touch = e.touches[0];
    setMouseX(touch.pageX - e.currentTarget.offsetLeft - width / 2);
    setMouseY(touch.pageY - e.currentTarget.offsetTop - height / 2);
  };
  const handleMouseMove = (e) => {
    setMouseX(e.pageX - e.currentTarget.offsetLeft - width);
    setMouseY(e.pageY - e.currentTarget.offsetTop - height);
  };
  const handleMouseLeave = () => {
    setHover(false);
    setTimeout(() => {
      setMouseX(0);
      setMouseY(0);
    }, 1000);
  };

  const mousePX = mouseX / width;
  const mousePY = mouseY / height;

  const rX = mousePX * 30;
  const rY = mousePY * -30;

  const cardStyle = {
    transform: `rotateY(${rX}deg) rotateX(${rY}deg)`,
    boxShadow: hover
      ? "rgba(255, 255, 255, 0.2) 0 0 40px 5px, rgba(255, 255, 255, 1) 0 0 0 1px, rgba(0, 0, 0, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px, inset rgba(255, 255, 255, 0.5) 0 0 0 6px"
      : "rgba(0, 0, 0, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px, inset rgba(255, 255, 255, 0.5) 0 0 0 6px",
    transition: hover
      ? "0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 2s cubic-bezier(0.23, 1, 0.32, 1)"
      : "1s cubic-bezier(0.445, 0.05, 0.55, 0.95)",
  };

  const cardInfoStyle = {
    padding: "20px",
    position: "absolute",
    bottom: "0",
    color: "#fff",
    transform: hover ? "translateY(0)" : "translateY(40%)",
    transition: hover
      ? "0.6s cubic-bezier(0.23, 1, 0.32, 1)"
      : "1s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1)",
    opacity: hover ? "1" : "0",
  };

  const cardBgStyle = {
    opacity: "1",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: hover
      ? "translate(-50%, -50%) scale(125%)"
      : "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    padding: "20px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    transition: hover
      ? "0.6s cubic-bezier(0.23, 1, 0.32, 1), background-size 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 5"
      : "1s cubic-bezier(0.445, 0.05, 0.55, 0.95), background-size 1s cubic-bezier(0.445, 0.05, 0.55, 0.95), opacity 5s 1s cubic-bezier(0.445, 0.05, 0.55, 0.95)",
  };
  return (
    <animated.div
      style={springProps}
      onMouseMove={(e) => handleOffset(e, e.clientX, e.clientY)}
      onMouseMove={(e) => handleOffset(e, e.clientX, e.clientY)}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      onTouchMove={(e) =>
        handleOffset(e, e.touches[0].clientX, e.touches[0].clientY)
      }
      onTouchEnd={() => setOffset({ x: 0, y: 0 })}
    >
      <div
        className="card-wrap transition-all"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchStart={() => setHover(true)}
        onTouchEnd={handleMouseLeave}
        ref={(cardWrap) => {
          if (cardWrap) {
            setWidth(cardWrap.offsetWidth);
            setHeight(cardWrap.offsetHeight);
          }
        }}
      >
        <div className="card transition-all" style={cardStyle}>
          <div className="card-bg" style={cardBgStyle}>
            {/* Imageコンポーネントを追加 */}
            <Image
              src={image}
              alt={header}
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </div>
          <div className="card-info transition-all" style={cardInfoStyle}>
            <h1 className="text-2xl">{header}</h1>
            <p>{content}</p>
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default Card;
