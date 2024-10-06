// HighScoreModal.jsx
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './HighScoreModal.css';

const HighScoreModal = ({ score, onClose }) => {
  return (
    <>
      <Modal show={true} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Whack-a-Mole Champion!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src="https://i.pinimg.com/originals/55/fb/44/55fb44dcbbec789f6edad27a058e1e55.gif" alt="" />
          <h5>Your score: {score}</h5>
          <p><i>Congratulations on setting a new high score!</i></p>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="danger" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default HighScoreModal;
