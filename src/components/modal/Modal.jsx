import { DivOverlay, DivModal } from './Modal.styled';

export const Modal = ({ image, name }) => {
  return (
    <DivOverlay>
      <DivModal>
        <img src={image} alt={name} width="950" />
      </DivModal>
    </DivOverlay>
  );
};
