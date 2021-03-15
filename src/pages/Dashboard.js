import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import {Card, Label, Result, BorderIn, InputContainer,
  CardTitle, CardHeader, Input, InputGroups, Select} from '../components/Card';
import api from '../services/api';
import chart from '../assets/images/chart.svg';
import Products from '../components/Products';
import {formatCoin} from '../utils.js';

const Page = styled.div`
  font-family: 'Montserrat';
  width: 100%;
  height: 100%;
  background: var(--background-page);

  display: flex;
  flex-direction: row;
`;
const Container = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  padding: 24px 20px;
`;
const TitlePrimary = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: var(--primary-color);
`;

const Portfolio = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 11px;
`;


function Dashboard(){
  const [portfolio, setPortfolio] = useState({});
  const [originalProducts, setOriginalProducts] = useState([]);
  const [dailyEquityData, setDailyEquityData] = useState([]);

  const [search, setSearch] = useState('');
  const [select, setSelect] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('getFixedIncomeClassData')
      .then(response => {
        setPortfolio(response.data.data.snapshotByPortfolio);
        setDailyEquityData(response.data.data.dailyEquityByPortfolioChartData);
        setOriginalProducts(response.data.data.snapshotByProduct);
        setProducts(response.data.data.snapshotByProduct);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function handleSearch(e){
    const inputValue = String(e.target.value).toLowerCase();
    setSearch(inputValue);
    
  }

  function handleSelect(e){
    const selectValue = e.target.value;
    setSelect(selectValue);
    sortProduct(selectValue);
  }

  function searchProducts(){
    return products.filter( product => {
      const name = String(product.fixedIncome.name).toLowerCase();
      const type = String(product.fixedIncome.bondType).toLowerCase();
      return name.includes(search) || type.includes(search);
    })
  }

  
  function orderByName(a, b){
    return a.fixedIncome.name > b.fixedIncome.name ? 1 : a.fixedIncome.name < b.fixedIncome.name ? -1 : 0
  }

  function orderByType(a, b){
    return a.fixedIncome.bondType > b.fixedIncome.bondType ? 1 : a.fixedIncome.bondType < b.fixedIncome.bondType ? -1 : 0
  }

  function orderByLowerProfitability(a, b){
    return a.position.profitability - b.position.profitability;
  }

  function orderByGreaterProfitability(a, b){
    return b.position.profitability - a.position.profitability;
  }

  function sortProduct(select){
    console.log('Entrou no ordenar por ', select)
    switch (select){
      case 'name' : 
        return products.sort(orderByName);
      case 'type':
        return products.sort(orderByType);
      case 'lowerprofitability':
        return products.sort(orderByLowerProfitability)
      case 'greaterprofitability':
        return products.sort(orderByGreaterProfitability)
      default:
        return originalProducts;
    }
        
  }

  useEffect(() => {
    if(search === '') {
      setProducts(originalProducts);
      sortProduct(select);
    }
    else
      setProducts(searchProducts);
  }, [search]);

  return(
    <>
      <Header />
      <Page>
        <Sidebar />
        <Container>
          <TitlePrimary>Renda Fixa</TitlePrimary>
          
          <Portfolio>
            <Card small>
              <BorderIn></BorderIn>
              <div>
                <Label>Saldo Bruto</Label>
                <Result>R$ {formatCoin(portfolio.equity)}</Result>
              </div>
            </Card>

            <Card small>
              <BorderIn></BorderIn>
              <div>
                <Label>Valor aplicado</Label>
                <Result>R$ {formatCoin(portfolio.valueApplied)}</Result>
              </div>
            </Card>

            <Card small>
              <BorderIn></BorderIn>
              <div>
                <Label>Resultado</Label>
                <Result>R$ {formatCoin(portfolio.equityProfit)}</Result>
              </div>
            </Card>

            <Card small>
              <BorderIn></BorderIn>
              <div>
                <Label>Rentabilidade</Label>
                <Result>{portfolio.percentageProfit}%</Result>
              </div>
            </Card>

            <Card small>
              <BorderIn></BorderIn>
              <div>
                <Label>cdi</Label>
                <Result>{portfolio.indexerValue}%</Result>
              </div>
            </Card>

            <Card small>
              <BorderIn></BorderIn>
              <div>
                <Label>% sobre cdi</Label>
                <Result>{portfolio.percentageOverIndexer}%</Result>
              </div>
            </Card>
          </Portfolio>

          <Card >
            {/* <CardTitle>Rentabilidade de Títulos</CardTitle> */}
            <img src={chart} alt=""/>
          </Card>

          <Card >
            <CardHeader>
              <CardTitle>Minhas rendas fixas</CardTitle>
                <InputGroups>
                  <InputContainer>
                    <Select 
                      name="order" 
                      value={select}
                      onChange={handleSelect}
                    >
                      <option>Ordernar por</option>
                      <option value="name">Titulo</option>
                      <option value="bondType">Tipo</option>
                      <option value="lowerprofitability">Menor Rentabilidade</option>
                      <option value="greaterprofitability">Maior Rentabilidade</option>
                    </Select>
                  </InputContainer>
                  <InputContainer>
                  <span className="material-icons">
                    search
                  </span>
                  <Input 
                    placeholder="Pesquise por titulo ou classe"  
                    type="text"
                    value={search}
                    onChange={handleSearch} 
                  />
                </InputContainer>
              </InputGroups>
            </CardHeader>
            <Products products={products} />
            {/* {products.map((product, index) => {
              return(
                <DetailedRow key={index}>
                  <DetailedCard>
                    <DetailedCardHeader>
                      <Label>Titulo</Label>
                    </DetailedCardHeader>
                    <DetailedCardBody>
                      <TitleName>{product.fixedIncome.name}</TitleName>
                      <div>
                        <Label>Classe</Label>
                        <Data>{product.fixedIncome.bondType}</Data>
                      </div>
                    </DetailedCardBody>
                  </DetailedCard>

                  <DetailedCard>
                    <DetailedCardHeader>
                      <Label>Resultado</Label>
                    </DetailedCardHeader>
                    <DetailedCardBody>
                      <div>
                        <Label>Valor Inves.</Label>
                        <Data green>{formatCoin(product.position.valueApplied)}</Data>
                      </div>

                      <div>
                        <Label>Saldo Bruto</Label>
                        <Data green>{formatCoin(product.position.equity)}</Data>
                      </div>

                      <div>
                        <Label>Rent.</Label>
                        <Data green>{product.position.profitability}%</Data>
                      </div>

                      <div>
                        <Label>% da cart.</Label>
                        <Data green>{product.position.portfolioPercentage}%</Data>
                      </div>

                      <div>
                        <Label>{product.position.indexerLabel}</Label>
                        <Data green>{product.position.indexerValue}</Data>
                      </div>

                      <div>
                        <Label>sobre {product.position.indexerLabel}</Label>
                        <Data green>{product.position.percentageOverIndexer}</Data>
                      </div>
                    </DetailedCardBody>
                  </DetailedCard>

                  <DetailedCard>
                    <DetailedCardHeader>
                      <Label>Vencimento</Label>
                    </DetailedCardHeader>
                    <DetailedCardBody>
                      <div>
                        <Label>data venc.</Label>
                        <Data blue>{product.due.date}</Data>
                      </div>

                      <div>
                        <Label>Dias até venc.</Label>
                        <Data blue>{product.due.daysUntilExpiration}</Data>
                      </div>
                    </DetailedCardBody>
                  </DetailedCard>
                </DetailedRow>
              ) 
            })} */}
          </Card>

        </Container>
      </Page>
    </>
  );
}

export default Dashboard;