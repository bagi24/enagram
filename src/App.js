import "./App.css";
import { useState } from "react";
import styled from "styled-components";
import logo from "./images/logo.png";
import ChekMark from "./images/check.png";
import Spelling from "./images/Spelling.png"
import Mic from "./images/mic.png"
import Aling from "./images/align.png"
import PDF from "./images/pdf.png"
import Arrow from "./images/arrow-right.png"
import AddIcon from "./images/Group.png"



function App() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  return (
    <Wrapper>
  
      <Sidebar>
        <LogoBox>
          <Logo>
            <img src={logo} alt="logo" />
          </Logo>
          <LogoText>ENAGRAM</LogoText>
        </LogoBox>
        <Nav>
          <NavItem>
            <img src={ChekMark}alt="ChekMark"/> მართლმწერი
          </NavItem>
          <NavItem active>  <img src={Spelling}alt="Spelling"/>ტექსტის შედარება</NavItem>
          <NavItem>  <img src={Mic}alt="Mic"/> ხმა   <img src={Arrow} alt="Arrow" /> ტექსტი </NavItem>
          <NavItem>  <img src={Aling}alt="Aling"/> ტექსტი   <img src={Arrow} alt="Arrow" /> ხმა </NavItem>
          <NavItem>    <img src={PDF} alt="PDF" /> PDF კონვერტაცია </NavItem>
        </Nav>
        <Footer>თამარ ონიანი ... </Footer>
      </Sidebar>

 
      <Main>
    
        <Topbar>
          <TopbarLeft>
            <Select>
              <option>ქართული</option>
              <option>English</option>
            </Select>
            <CheckboxLabel>
              <input type="checkbox" /> ფორმატის შენარჩუნება
            </CheckboxLabel>
          </TopbarLeft>
          <SaveBtn>           <img src={AddIcon} alt="AddIcon" /> ახლის გახსნა </SaveBtn>
        </Topbar>

      
        <Content>
          <TextCard>
            <TextArea
              value={left}
              onChange={(e) => setLeft(e.target.value)}
              placeholder="დაიწყე წერა..."
            />
            
          </TextCard>
      
          <TextCard>
            <TextArea
              value={right}
              onChange={(e) => setRight(e.target.value)}
              placeholder="დაიწყე წერა..."
            />
          </TextCard>
        </Content>

     
        <Actions>
          <CompareBtn>↻ შედარება</CompareBtn>
        </Actions>
      </Main>
    </Wrapper>
  );
}

export default App;

/* --- styled-components --- */

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f3f4f6;

`;

const Sidebar = styled.aside`
  width: 250px;
  background: #0b2c59;
  color: #fff;
  display: flex;
  flex-direction: column;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled.div`
  border-radius: 6px;
  width: 42.65px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 6px; 
  }
`;

const LogoText = styled.span`
  font-weight: bold;
  font-size: 18px;
`;

const Nav = styled.nav`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
`;

const NavItem = styled.a`
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  display:flex;
  aling-item: center;
 gap: 9px;
  ${(props) =>
    props.active
      ? `background: rgba(255,255,255,0.1); font-weight: 500;`
      : `&:hover { background: rgba(255,255,255,0.1); }`}
`;

const Footer = styled.div`
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 14px;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
   background: #fff;
`;

const Topbar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
`;

const TopbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Select = styled.select`
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 14px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  cursor: pointer;
`;

const SaveBtn = styled.button`
  background: #2563eb;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  display:flex;
  align-items: center; 
 justify-content: center;
  gap:4px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  &:hover {
    background: #1e40af;
  }
`;

const Content = styled.main`
   display: grid;
   grid-template-columns: 1fr;
    background: #fff;
  gap: 52px;
  padding: 24px;
  flex: 1;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const TextCard = styled.div`
  
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;

`;



const TextArea = styled.textarea`
  flex: 1;
  border: 1px solid #F0F7FF;
    background: #F0F7FF;
  border-radius: 6px;
  padding: 12px;
  font-size: 14px;
  resize: none;
  min-height: 200px;
  outline: none;
  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px #93c5fd;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px 0;
    background: #fff;
`;

const CompareBtn = styled.button`
  background: #2563eb;
  color: white;
  padding: 8px 24px;
  border-radius: 6px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  &:hover {
    background: #1e40af;
  }
`;
