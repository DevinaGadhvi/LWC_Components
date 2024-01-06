import { LightningElement } from 'lwc';
import ConfirmationModal from 'c/confirmationModal';

//constants
const deleteButtonLabel = 'Delete';
const createButtonLabel = 'Create';
const headerLabel = 'This is to demonstrate using modals with lightning modal';
const cardTitleLabel = 'Modals';
const deleteConfirmationLabel = 'Are you sure you want to delete this?';
const createConfirmationLabel = 'Are you sure you want to create this?';
const confirmationKeyword = 'Confirmation';
const smallModalSize = 'small';
const modalDescription = 'Confirmation Modal';
export default class ModalButtons extends LightningElement {

    labels = {deleteButtonLabel, createButtonLabel, headerLabel, cardTitleLabel};

    async handleBtnClick(event){
        let eventLabel = event.target.label;
        let detailWrapper = {header: '', content : '', footerButtonLabel: ''};
        if(eventLabel == deleteButtonLabel){
            detailWrapper.header = `${deleteButtonLabel} ${confirmationKeyword}`;
            detailWrapper.content = deleteConfirmationLabel;
            detailWrapper.footerButtonLabel = deleteButtonLabel;
        }
        else if(eventLabel == createButtonLabel){
            detailWrapper.header = `${createButtonLabel} ${confirmationKeyword}`;
            detailWrapper.content = createConfirmationLabel;
            detailWrapper.footerButtonLabel = createButtonLabel;
        }
        const result = await ConfirmationModal.open({
            size : smallModalSize,
            description : modalDescription,
            header : detailWrapper.header,
            content : detailWrapper.content,
            footerButtonLabel : detailWrapper.footerButtonLabel
          })
        if(result){
            console.log('User confirmed');
        }
        else{
            console.log('User cancelled Popup');
        }
          
    }
}