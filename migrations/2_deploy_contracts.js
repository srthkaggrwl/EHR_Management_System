const PatientRecords = artifacts.require("PatientRecords");

module.exports = function (deployer) {
  deployer.deploy(PatientRecords)
    .then(() => {
      console.log('PatientRecords deployed successfully');
    })
    .catch(err => {
      console.error('Deployment failed:', err.message);
      console.error('Stack Trace:', err.stack);
    });
};
