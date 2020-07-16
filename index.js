const express = require("express"), app = express(), router = express.Router();
const bodyParser = require("body-parser");
const dtoObj = require('./dto.js');

// middleware
app.use(bodyParser.json());

const transformData = (payloadValue) => {
    const payloadReferenceData = dtoObj.getReferenceData();
    for (const referenceData in payloadReferenceData) {
        if(payloadValue.valueType === "array"){
            payloadValue.value.map(transformData);  
        }
        if(payloadValue.valueType === "string" && payloadValue.value.includes(referenceData)){
            payloadValue.value = payloadValue.value.replace(new RegExp('{' + referenceData + '}', 'gi'), payloadReferenceData[referenceData]);            
        }
    }     
}

app.post('/', (req, res) => {
    if(req && req.body && req.body.hasOwnProperty('payload') && req.body.hasOwnProperty('referenceData')){  
        dtoObj.setReferenceData(req.body.referenceData);
        const expectedData = JSON.parse(JSON.stringify(req.body.payload));
        expectedData.value.map(transformData);
        res.status(200)
           .json(expectedData);  
        //console.log(JSON.stringify(expectedData));
    }
})

// server
app.listen(4000, () => {
    console.log('Server listening at http://localhost:4000');
});  

module.exports = app