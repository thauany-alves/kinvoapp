import React from 'react';
import styled from 'styled-components';
import logoImg from '../assets/images/logo-header.png';
import { Icon } from './Icon';

const HeaderContainer =  styled.header`
  background: var(--background-card);
  /* width: 100%; */
  height: 90px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 16px;
  border-bottom: 1px solid var(--background-page);

`;

const Items = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 140px;
`;

const Label = styled.p`
  font-size: 8px;
  font-weight: 700;
  color: var(--text-label-header);
  text-transform: uppercase;
`;

const Value = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: var(--text-items);
`;



function Header(){
  return(
    <HeaderContainer>
      <img src={logoImg} alt=""/>
      
    <Items>
      <Item>
        <Icon />
        <div>
          <Label>Saldo Bruto</Label>
          <Value>130.521.230,02</Value>
        </div>
      </Item>

      <Item>
        <Icon />
        <div>
          <Label>Valor Aplicado</Label>
          <Value>521.230,02</Value>
        </div>
      </Item>

      <Item>
        <Icon />
        <div>
          <Label>Saldo Bruto</Label>
          <Value>130.521.230,02</Value>
        </div>
      </Item>

      <Item>
        <Icon />
        <div>
          <Label>Saldo Bruto</Label>
          <Value>Minha carteira</Value>
        </div>
      </Item>

      <Icon />

    </Items>
    </HeaderContainer>
  );
}

export default Header;