import { FunctionComponent, useRef, useState } from "react";

import { Control } from "./Control";
import { StreamUrl } from "../types";

type Props = {
  source: StreamUrl;
};

export const Player: FunctionComponent<Props> = ({ source }) => {
  const playerRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.2);

  const handleSetVolume = (volume: number) => {
    if (playerRef.current) {
      playerRef.current.volume = volume;
      setVolume(volume);
    }
  };
  const handleOnPauseClick = () => {
    playerRef.current?.pause();
    setIsPlaying(false);
  };

  const handleOnPlayClick = () => {
    playerRef.current?.play();
    setIsPlaying(true);
  };

  return (
    <>
      <Control
        isReady={isReady}
        isPlaying={isPlaying}
        onPauseClick={handleOnPauseClick}
        onPlayClick={handleOnPlayClick}
        onSetVolume={handleSetVolume}
        volume={volume}
      />
      <audio
        onCanPlay={(e) => {
          e.currentTarget.volume = volume;
          setIsPlaying(true);
          setIsReady(true);
        }}
        ref={playerRef}
        autoPlay
      >
        <source src={source} type="audio/mpeg" />
      </audio>
    </>
  );
};
