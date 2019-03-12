import React from 'react';
import Modal from 'react-modal';
import "./MyModal.css";

Modal.setAppElement('#root')

class MyModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showModal: false,
      _id: props._id,
      selectPicDelete: props.selectPicDelete,
      awsKey: props.awsKey,
    };
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }



  delete = () => {
    // console.log("inside delete()")
    this.state.selectPicDelete(this.state._id, this.state.awsKey)
    this.handleCloseModal();
  };
  
  handleOpenModal () {
    // console.log(this.state._id)
    // console.log(this.state.selectPicDelete)
    this.setState({ showModal: true });
    this.timerForCloseModal();
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  timerForCloseModal = () => {
    setTimeout(this.handleCloseModal, 3000)
  };
  
  render () {
    return (
      <div>
        <div className="modal-onclick-btn" onClick={this.handleOpenModal}>Delete</div>

        <Modal 
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
           className="myModal"
           shouldCloseOnOverlayClick={false}
          //  closeTimeoutMS={3000}
        >
   
        <div className="modal-close-btn" onClick={this.handleCloseModal}>close</div>

        <div className="modal-text1 text-center">To PERMENANTLY delete this</div>
        <div className="modal-text2 text-center">picture click "Delete"</div>
          
          <div className="modal-button-area text-center">
          <button className="modal-delete-btn text-center" onClick={this.delete}>Delete</button>
          </div>
          
     
        
        </Modal>
      </div>
    );
  }
}

export default MyModal;