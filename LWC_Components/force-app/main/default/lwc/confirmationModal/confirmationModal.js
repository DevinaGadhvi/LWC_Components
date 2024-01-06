import { api } from 'lwc';
import LightningModal from 'lightning/modal';

//constants
const cancelButtonLabel = 'Cancel';

/*
Component Details
Description: Generic Accessible Component with parameters to display header, body and button label
passed
*/
export default class ConfirmationModal extends LightningModal {

    labels = {cancelButtonLabel};

     @api header;
     @api content;
     @api footerButtonLabel;

    handleClose() {
        this.close(false);
    }
      
      handleDelete() {
        this.close(true);
    }
}