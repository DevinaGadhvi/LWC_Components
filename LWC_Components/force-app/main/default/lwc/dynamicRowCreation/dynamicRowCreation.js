import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const columns = [ 'Column 1', 'Column 2', 'Column 3']
const inputRange = {min: 0, max: 5};
export default class DynamicRowCreation extends LightningElement {

    totalRows;
    @track tableData;
    showTable;
    inputRange = inputRange;
    columns = columns;
    
    //handle input for no. of rows
    inputChangeHandler(event){
        this.showTable = false;
        let isInputsCorrect = this.validateInputs();
        if (isInputsCorrect) {
            this.totalRows = event.target.value;
            this.createTableRows();
            this.showTable = true;
        }
    }

    //on save button click to serialize JSON from tableData and show success message
    saveBtnHandler(){
        let isInputsCorrect = this.validateInputs();
        if (isInputsCorrect) {
            console.log('Final JSON Data: '+JSON.stringify(this.tableData));
            this.showToastMessage('Success','Data saved successfully','success');
        }    
    }

    //handle input value change for table rowds
    tableChangeHandler(event){   
        this.tableData.forEach(rowData => {
            if(rowData.Id == event.target.dataset.id){
                rowData[event.target.name] = event.target.value;
            }
        });
    }

    //insert empty table rows
    createTableRows(){
        this.tableData = [];
        for(let i=0; i<parseInt(this.totalRows); i++){
            this.tableData.push({Id : i+1, rowInput1 : '', rowInput2: '', rowInput3: ''});
        }
    }

    //validate required field and min max values
    validateInputs(){
        let isInputsCorrect = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputField) => {
                inputField.reportValidity();
                return validSoFar && inputField.checkValidity();
            }, true);
        return isInputsCorrect;
    }

    //generic method to showToastMessage
    showToastMessage(title, message, variant){
        this.dispatchEvent(
            new ShowToastEvent({
                title : title,
                message : message,
                variant : variant
            })
        );
    }
}