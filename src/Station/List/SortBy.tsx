import { Button, ButtonGroup } from "semantic-ui-react";
import { sortTypes, useStationStore } from "../../store";

export const SortBy = () => {
  const { setSortBy, sortBy } = useStationStore();

  return (
    <ButtonGroup>
      {sortTypes.map((type) => (
        <Button
          key={type}
          active={sortBy === type}
          onClick={() => setSortBy(type)}
        >
          {type}
        </Button>
      ))}
    </ButtonGroup>
  );
};
