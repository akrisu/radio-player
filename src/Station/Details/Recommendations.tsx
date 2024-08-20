import { useEffect, useState } from "react";
import { useStationStore } from "../../store";
import { Card } from "../Card";
import { Grid, Header } from "semantic-ui-react";
import { Station } from "../../types";

export const Recommendations = () => {
  const { selectedStation, setSelectedStation, getRecommendationsForTags } =
    useStationStore();
  const [recommendations, setRecommendations] = useState<Array<Station>>([]);

  useEffect(() => {
    if (selectedStation) {
      setRecommendations(getRecommendationsForTags(selectedStation.tags));
    }
  }, [selectedStation, getRecommendationsForTags]);

  if (!recommendations || recommendations?.length === 0) {
    return null;
  }

  return (
    <>
      <Header as="h3">You may also like</Header>
      <Grid centered doubling>
        {recommendations.map((recommendation) => (
          <Card
            key={recommendation.id}
            name={recommendation.name}
            onClick={() => {
              setSelectedStation(recommendation);
            }}
            popularity={recommendation.popularity}
            imgUrl={recommendation.imgUrl}
          />
        ))}
      </Grid>
    </>
  );
};
