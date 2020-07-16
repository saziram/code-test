const express = require("express"), app = express(), router = express.Router();
const bodyParser = require("body-parser");
const { headers } = require('./header');
const dtoObj = require('./dto');

app.use(bodyParser.json());
app.use(headers);

const transformData = (payloadValue) => {
    const payloadReferenceData = dtoObj.getReferenceData();
    for (const referenceData in payloadReferenceData) {
        if(payloadValue.valueType === "array"){
            payloadValue.value.map(transformData);  
        } else if(payloadValue.valueType === "string"){
            if(payloadValue.value.includes(referenceData)){
                payloadValue.value = payloadValue.value.replace(new RegExp('{' + referenceData + '}', 'gi'), payloadReferenceData[referenceData]);            
            }            
        } else {
            throw new Error('Invalid valueType');
        }
    }     
}

app.post('/', async(req, res) => {
    if(req && req.body && Object.keys(req.body).length !== 0){
        if(req.body.hasOwnProperty('payload') && req.body.hasOwnProperty('referenceData')){  
            dtoObj.setReferenceData(req.body.referenceData);
            const expectedData = JSON.parse(JSON.stringify(req.body.payload));
            try {
                await expectedData.value.map(transformData);
            } catch(e) {
                res.status(203).send(); 
            }                        
            res.status(200)
               .json(expectedData);  
        }else{
            res.status(202).send();            
        }
    }else{
        res.status(201).send();
    }
})

module.exports = app