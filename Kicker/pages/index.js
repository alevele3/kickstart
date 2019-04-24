import React, {Component} from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';



// export default () => {
//   return <h1>This is the  campaign list page !!!</h1>;
// };

class CampaignIndex extends Component {

  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    console.log(campaigns);// IT DOES NOT WORK INSIED THE getInitialProps, look at lines 20 - 23.

    return { campaigns };
  }


// SOLO PARA PODER VER EL CONSOLE.LOG :// IT DOES NOT WORK INSIED THE getInitialProps, look at lines 20 - 23.
  async componentDidMount() {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
    console.log(campaigns);
    }

renderCampaings() {
const items = this.props.campaigns.map(address => {
  return {
    header: address,
    description: (
      <Link route={`/campaigns/${address}`}>
      <a> View Campaigns! </a>
      </Link>
    ),

    fluid: true
  };
});

return <Card.Group items={items} />;

}



    render(){

      return (
        <Layout>
          <div>
            <link
              rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
              />
                <h3>Open Campaigns</h3>

                <Link route="/campaigns/new">
                  <a>
                    <Button floated = "right" content='Create Campaign' icon="add circle"
                    primary />
                  </a>
                </Link>

                {this.renderCampaings()}

          </div>
      </Layout>
    );
    }
  }

  export default CampaignIndex;
