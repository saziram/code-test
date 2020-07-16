function dto() {
  var _referenceData, _payload;
}

dto.prototype = {
  getReferenceData : () => { return _referenceData; },
  setReferenceData : (value) => { _referenceData = value; },
  getPayload : () => { return _payload; },
  setPayload : (value) => { _payload = value; }
}

module.exports = new dto();