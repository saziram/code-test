/**
 * Entry point
 * Handle Post API request and transform the request payload data into expected response data using transformData function
 */
const express = require("express"), app = express(), router = express.Router();
const bodyParser = require("body-parser");
const { headers } = require('./header');
const dtoObj = require('./dto');

app.use(bodyParser.json());
app.use(headers);

/* 
* TransformData Function
* it allows string and array valueType to process the transformation
* do recursive for array valueType until it get string valueType
* match string value with specified key value of ReferenceData 
* replace the value for matching string 
*/
const transformData = (payloadValue) => {
    //getting referenceData from payload using getReferenceData function
    const payloadReferenceData = dtoObj.getReferenceData();
    for (const referenceData in payloadReferenceData) {
        if(payloadValue.valueType === "array"){
            //do recursive if the valueType is array
            payloadValue.value.map(transformData);  
        } else if(payloadValue.valueType === "string"){
            //checking current object value by matching it with referenceData key
            if(payloadValue.value.includes(referenceData)){
                //replace the matching string
                payloadValue.value = payloadValue.value.replace(new RegExp('{' + referenceData + '}', 'gi'), payloadReferenceData[referenceData]);            
            }            
        } else {
            //throw error if the valueType is not a string or array
            throw new Error('Invalid valueType');
        }
    }     
}

//Post API endpoint
app.post('/', async(req, res) => {
    if(req && req.body && Object.keys(req.body).length !== 0){
        //check payload and referenceData object exists in the payload data
        if(req.body.hasOwnProperty('payload') && req.body.hasOwnProperty('referenceData')){  
            //map reference data using setReferenceData function
            dtoObj.setReferenceData(req.body.referenceData);
            const expectedData = JSON.parse(JSON.stringify(req.body.payload));
            let _error;
            try {
                //call transformData for each element to replace the matching string
                await expectedData.value.map(transformData);
            } catch(error) {                
                _error = error;
            } finally {
                if(_error){
                    //return 203 if the valueType is not a string/array
                    res.status(203).send(); 
                }else{
                    //return expected response with status code as 200                    
                    res.status(200)
                       .json(expectedData);  
                }                
            }   
        }else{
            //return 202 status if either payload object or referenceData object is not exists
            res.status(202).send();            
        }
    }else{
        //return 201 status if getting empty payload
        res.status(201).send();
    }
})

module.exports = app
