import { FunctionComponent } from "react";
import { Header, Modal, ModalContent, ModalHeader } from "semantic-ui-react";
import { Station } from "../../types";
import { Player } from "../../Player";
import { Recommendations } from "./Recommendations";

type Props = {
  onClose: () => void;
} & Pick<Station, "name" | "description" | "streamUrl">;

export const Details: FunctionComponent<Props> = ({
  name,
  description,
  streamUrl,
  onClose,
}) => (
  <Modal open onClose={onClose} closeIcon>
    <ModalHeader>
      <Header as="h2">{name}</Header>
    </ModalHeader>
    <ModalContent>
      {description}
      <Player key={streamUrl} source={streamUrl} />
      <Recommendations />
    </ModalContent>
  </Modal>
);
