import { LightningElement,track } from 'lwc';
import startRequest from '@salesforce/apex/TestLWCController.startRequest';

const URL = 'https://jsonplaceholder.typicode.com/todos/1';

export default class CalloutLwc extends LightningElement {
    /*Points to note:
     * Add endpoint in remote site setting and CSP to allow callouts
     */ 

    endPoint = URL;
    showSpinner = false;
    @track responseData = [];
    isSuccess = false;
    labelStr;

    //handler to call Synchronous Apex Request callout
    handleApexButtonClick(){
        this.showSpinner = true;
        startRequest({endPoint : this.endPoint})
        .then(result => {
            this.isSuccess = result.isSuccess;
            this.labelStr = "Apex";
            this.responseData = [];
            if(this.isSuccess){
                let responseStr = result.responseBody;
                let jsonParsed = JSON.parse(responseStr);
                for(let [key, value] of Object.entries(jsonParsed)) {
                    this.responseData.push({"key": `${key}`, "value": `${value}`})
                }
            }
            else{
                console.log('Error while parsing response:'+result.errorMsg);
            }
        })
        .catch(error => {
            console.log('Error while getting response from Apex:'+JSON.stringify(error))
        })
        this.showSpinner = false;
    }

    //handler to callout using Fetch API from JS
    handleFetchButtonClick(){
        this.showSpinner = true;
        this.labelStr = "Fetch API";
        fetch(this.endPoint, { method : 'GET' })
        .then(response => {
            if(response.ok){
                return response.json();
            }else{
                throw Error(response);
            }
        })
        .then( respJSON => {

            this.responseData = [];
            let responseFetchStr = JSON.stringify(respJSON);
            let jsonParsed = JSON.parse(responseFetchStr);
            for(let [key, value] of Object.entries(jsonParsed)) {
                this.responseData.push({"key": `${key}`, "value": `${value}`})
            }
            this.isSuccess = true;
        })
        .catch(error => {
            console.log('Error while getting response from Fetch Api:'+JSON.stringify(error))
        })
        this.showSpinner = false;
    }
}