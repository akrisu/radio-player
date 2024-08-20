import { useEffect } from "react";
import { Grid, GridColumn, Header, Loader } from "semantic-ui-react";
import { SortBy } from "./SortBy";
import { useStationStore } from "../../store";
import { Card } from "../Card";
import { Details } from "../Details";

export const List = () => {
  const {
    fetchData,
    isLoading,
    setSelectedStation,
    selectedStation,
    getSortedData: getSorted,
  } = useStationStore();

  useEffect(() => {
    fetchData(
      "https://s3-us-west-1.amazonaws.com/cdn-web.tunein.com/stations.json"
    );
  }, [fetchData]);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Header as="h1">Stations</Header>
      <SortBy />
      <Grid columns="5" doubling>
        {getSorted().map((station) => (
          <GridColumn key={station.id}>
            <Card
              onClick={() => setSelectedStation(station)}
              imgUrl={station.imgUrl}
              name={station.name}
              popularity={station.popularity}
            />
          </GridColumn>
        ))}
        {selectedStation && (
          <Details
            name={selectedStation.name}
            description={selectedStation.description}
            streamUrl={selectedStation.streamUrl}
            onClose={() => setSelectedStation(null)}
          />
        )}
      </Grid>
    </>
  );
};
