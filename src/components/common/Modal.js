import React from 'react'

const Modal = ({
    open,
    close = () => {},
    handleSubmit = () => {},

}
) => {
    const [show, setShow] = useState(open);
  
    const handleClose = () => {
        setShow(false);
        close(false);
      };
    
  
    return (
    <div>
          <Modal
    title="Vertically centered modal dialog"
    wrapClassName="vertical-center-modal"
    open={show}
    onOk={handleClose}
    onCancel={handleClose}
    
  >
    <p>some contents...</p>
    <p>some contents...</p>
    <p>some contents...</p>
  </Modal>
    </div>
  
  )
}

export default Modal