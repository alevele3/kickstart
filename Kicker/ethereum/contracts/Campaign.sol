pragma solidity ^0.4.20;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimo) public {
        address newCampaign = new Campaign(minimo, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}
contract Campaign {

    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;  // STARTS AS FALSE !
        uint approvalCount;
        mapping (address => bool) approvals; // Refernce type, the ones above are value types.
        // MAPPING IS A CONSTANT TIME LOOK UP

    }

    Request[] public request;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    //address[] public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimo, address creator) public {
        manager = creator;
        minimumContribution = minimo;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

       approvers[msg.sender] = true;  // Address does not get stored inside mapping, only the bool value 'true'
        //approvers.push(msg.sender);// this notes element pushing for arrays, not mapping

        approversCount++;
    }

    function createRequest(string description, uint value, address recipient)
        public restricted {
            //require(approvers[msg.sender])  only an example.
        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false,  // STARTS AS FALSE !
           approvalCount: 0
        });

        // Request newRequest = Request(description, value, recipient, false); EXACTAMENT IGUAL A LO DE ARRIBA EN
        // based in the order of the FIELDS...


        request.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage requst = request[index];

        require(approvers[msg.sender]);
        require(!requst.approvals[msg.sender]);


        requst.approvals[msg.sender] = true;
        requst.approvalCount++;
    }


    function finalizeRequest(uint index) public restricted {
        Request storage reqst = request[index];
        require (reqst.approvalCount > (approversCount / 2));
        require (!reqst.complete);

        reqst.recipient.transfer(reqst.value);
        reqst.complete = true;

    }

    function getSummary() public view returns (
      uint, uint, uint, uint, address
      ) {
      return (
        minimumContribution,
        this.balance,
        requests.length,
        approversCount,
        manager
      );

    }

    function getRequuestsCount () public view returns (uint) {
        return requests.length;
    }

}
