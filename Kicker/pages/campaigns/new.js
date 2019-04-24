import React, { Component }  from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';

import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component { // AQUI ES DONDE LA MAGIA CON EHTEREUM EMPIEZA
  state = {
    minimumContribution: '',
    errorMessage:'',
    loading: false
  };

  onSubmit = async (event) => {// AQUI ES DONDE LA MAGIA CON EHTEREUM EMPIEZA
    event.preventDefault();

    this.setState({ loading: true, errorMessage:''});

    try{
    const accounts = await web3.eth.getAccounts();// AQUI ES DONDE LA MAGIA CON EHTEREUM EMPIEZA
    await factory.methods
    .createCampaign(this.state.minimumContribution)// AHAAAAA AQUI ES DONDE LA MAGIA CON EHTEREUM EMPIEZA
    .send({
      from: accounts[0]// AQUI ES DONDE LA MAGIA CON EHTEREUM EMPIEZA
      });

    Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message});
    }
    this.setState({ loading: false });
  };


  render() {
    return (
      <Layout>
      <h3>Create a Campaign ! </h3>

      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} >
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
           label="wei"
           labelPosition='right'
           value={this.state.minimumContribution}// AHAAAAA
           onChange={event =>
             this.setState({ minimumContribution: event.target.value})}// AQUI ES DONDE LA MAGIA CON EHTEREUM EMPIEZA
           />

        </Form.Field>

        <Message error header="Upaah!" content={this.state.errorMessage} />

        <Button loading={this.state.loading} primary>Create!</Button>

      </Form>
      </Layout>

    );
  }
}

export default CampaignNew;
