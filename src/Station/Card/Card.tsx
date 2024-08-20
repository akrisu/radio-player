import { Rating, Card as UICard } from "semantic-ui-react";

import { FunctionComponent } from "react";
import { Station } from "../../types";

type Props = {
  onClick: () => void;
} & Pick<Station, "imgUrl" | "name" | "popularity">;

export const Card: FunctionComponent<Props> = ({
  onClick: handleOnClick,
  imgUrl,
  name,
  popularity,
}) => (
  <UICard
    onClick={() => {
      handleOnClick();
    }}
    image={imgUrl}
    header={name}
    description={
      <>
        Popularity: <Rating defaultRating={popularity} maxRating={5} disabled />
      </>
    }
  />
);
