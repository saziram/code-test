/**
 * DTO class for ReferenceData object
 */

//declaring private variables
function dto() {
  let _referenceData;
}

//getter and setter for ReferenceData
dto.prototype = {
  getReferenceData : () => { return _referenceData; },
  setReferenceData : (value) => { _referenceData = value; },
}

module.exports = new dto();