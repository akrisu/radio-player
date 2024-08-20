import { FunctionComponent } from "react";
import { Container, Icon } from "semantic-ui-react";
import { Button } from "./Button";

type Props = {
  isReady: boolean;
  isPlaying: boolean;
  onPauseClick: () => void;
  onPlayClick: () => void;
  onSetVolume: (newVolume: number) => void;
  volume: number;
};

export const Control: FunctionComponent<Props> = ({
  isReady,
  isPlaying,
  onPauseClick,
  onPlayClick,
  onSetVolume,
  volume,
}) => {
  return (
    <Container>
      {!isReady ? (
        <Button disabled>
          <Icon name="sync" />
          Loading
        </Button>
      ) : isPlaying ? (
        <Button icon onClick={onPauseClick}>
          <Icon name="pause" />
          Pause
        </Button>
      ) : (
        <Button icon onClick={onPlayClick}>
          <Icon name="play" />
          Play
        </Button>
      )}
      <input
        disabled={!isReady}
        aria-label="volume"
        name="volume"
        type="range"
        min={0}
        step={0.05}
        max={1}
        value={volume}
        onChange={({ currentTarget }) => {
          onSetVolume(currentTarget.valueAsNumber);
        }}
      />
    </Container>
  );
};
