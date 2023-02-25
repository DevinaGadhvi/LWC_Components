public with sharing class TestLWCController {

    @AuraEnabled
    public static ResponseWrapper startRequest(String endPoint){
        ResponseWrapper responseWrap = new ResponseWrapper();
        
        try{
            HTTPRequest req=new HTTPRequest();
            HttpResponse res = new HttpResponse();
            Http http = new Http();
            req.setMethod('GET');
            req.setEndpoint(endPoint);
            res = http.send(req);
            
            if(res.getstatusCode() == 200 ){
                responseWrap.isSuccess = true;
                Map<String,object> jsonBody =  (Map<String, Object>) Json.deserializeUntyped(res.getBody());
                responseWrap.responseBody = res.getBody();
            }
            
            return responseWrap;
        }
        catch(Exception e){
            responseWrap.errorMsg = e.getMessage();
            return responseWrap;
        }
        
    }

    public class ResponseWrapper{
        @AuraEnabled
        public Boolean isSuccess = false;
        @AuraEnabled
        public String errorMsg = '';
        @AuraEnabled
        public String responseBody = '';
    }

}