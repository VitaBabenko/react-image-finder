import { DivOverlay, DivModal } from './Modal.styled';

export const Modal = ({ image: { largeImageURL, tags } }) => {
  return (
    <DivOverlay>
      <DivModal>
        <img src={largeImageURL} alt={tags} />
      </DivModal>
    </DivOverlay>
  );
};
