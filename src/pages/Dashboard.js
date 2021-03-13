import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';


const Page = styled.div`
  font-family: 'Montserrat';
  margin: 0;
  background: var(--background-page);
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;

`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 20px;
`;
const TitlePrimary = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: var(--primary-color);
`;

function Dashboard(){
  return(
    <>
      <Header />
      <Page>
        <Sidebar />
        <Container>
          <TitlePrimary>Renda Fixa</TitlePrimary>
        </Container>
      </Page>
    </>
  );
}

export default Dashboard;