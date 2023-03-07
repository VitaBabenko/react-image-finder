import { DivOverlay, DivModal } from './Modal.styled';

export const Modal = ({ image: { webformatURL, tags } }) => {
  return (
    <DivOverlay>
      <DivModal>
        <img src={webformatURL} alt={tags} />
      </DivModal>
    </DivOverlay>
  );
};
